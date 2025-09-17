import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login, logout, get_user_model
from django.contrib.auth.hashers import make_password, check_password
from .models import Subject

User = get_user_model()

# ---------------- Auth ----------------
@csrf_exempt
def signup_view(request):
    if request.method != 'POST':
        return HttpResponseBadRequest('Only POST allowed')
    try:
        body = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    email = body.get('email')
    username = body.get('username') or email
    frontend_hashed_password = body.get('password')
    if not email or not frontend_hashed_password:
        return HttpResponseBadRequest('email and password required')

    if User.objects.filter(username=username).exists():
        return HttpResponseBadRequest('username already exists')

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(frontend_hashed_password)
    )
    login(request, user)
    return JsonResponse({'status': 'created', 'username': user.username})


@csrf_exempt
def login_view(request):
    if request.method != 'POST':
        return HttpResponseBadRequest('Only POST allowed')
    try:
        body = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    username = body.get('username')
    frontend_hashed_password = body.get('password')
    if not username or not frontend_hashed_password:
        return HttpResponseBadRequest('username and password required')

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponseBadRequest('Invalid credentials')

    if not check_password(frontend_hashed_password, user.password):
        return HttpResponseBadRequest('Invalid credentials')

    login(request, user)
    return JsonResponse({'status': 'ok', 'username': user.username})


@csrf_exempt
def logout_view(request):
    if request.method != 'POST':
        return HttpResponseBadRequest('Only POST allowed')
    logout(request)
    return JsonResponse({'status': 'logged_out'})


def me_view(request):
    if not request.user or not request.user.is_authenticated:
        return JsonResponse({'authenticated': False})
    return JsonResponse({'authenticated': True, 'username': request.user.username, 'email': request.user.email})


def users_list_view(request):
    if not request.user.is_authenticated or not request.user.is_staff:
        return HttpResponseBadRequest('Forbidden')
    from .models import UserProfile
    profiles = [p.to_dict() for p in UserProfile.objects.select_related('user').all()]
    return JsonResponse(profiles, safe=False)


# ---------------- Subjects ----------------
def parse_subjects_payload(body):
    if isinstance(body, list):
        return body
    if isinstance(body, dict):
        if 'subjects' in body and isinstance(body['subjects'], list):
            return body['subjects']
        return [body]
    return None


@csrf_exempt
def subjects_view(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            subjects = [s.to_dict() for s in Subject.objects.filter(owner=request.user)]
        else:
            subjects = []
        return JsonResponse(subjects, safe=False)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponseBadRequest('Authentication required')
        try:
            body = json.loads(request.body.decode('utf-8'))
            subjects_payload = parse_subjects_payload(body)
            if subjects_payload is None:
                return HttpResponseBadRequest('Invalid JSON payload')

            Subject.objects.filter(owner=request.user).delete()
            created = []
            for s in subjects_payload:
                title = s.get('title') or ''
                faculty = s.get('faculty') or ''
                present = int(s.get('present') or 0)
                absent = int(s.get('absent') or 0)
                obj = Subject.objects.create(
                    owner=request.user,
                    title=title, faculty=faculty, present=present, absent=absent
                )
                created.append(obj.to_dict())

            return JsonResponse({'status': 'ok', 'count': len(created), 'subjects': created})
        except Exception as e:
            return HttpResponseBadRequest(str(e))

    return HttpResponseBadRequest('Unsupported method')


@csrf_exempt
@require_http_methods(['GET', 'PUT', 'PATCH', 'DELETE'])
def subject_detail_view(request, pk):
    try:
        subj = Subject.objects.get(pk=pk)
    except Subject.DoesNotExist:
        return HttpResponseBadRequest('Subject not found')

    if request.method == 'GET':
        if subj.owner and subj.owner != request.user and not request.user.is_staff:
            return HttpResponseBadRequest('Forbidden')
        return JsonResponse(subj.to_dict(), safe=False)

    try:
        body = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        return HttpResponseBadRequest('Invalid JSON payload')

    if request.method in ('PUT', 'PATCH'):
        if subj.owner and subj.owner != request.user and not request.user.is_staff:
            return HttpResponseBadRequest('Forbidden')

        title = body.get('title', subj.title)
        faculty = body.get('faculty', subj.faculty)
        present = int(body.get('present', subj.present) or 0)
        absent = int(body.get('absent', subj.absent) or 0)

        subj.title = title
        subj.faculty = faculty
        subj.present = present
        subj.absent = absent
        subj.save()
        return JsonResponse(subj.to_dict())

    if request.method == 'DELETE':
        if subj.owner and subj.owner != request.user and not request.user.is_staff:
            return HttpResponseBadRequest('Forbidden')
        subj.delete()
        return JsonResponse({'status': 'deleted', 'id': pk})
