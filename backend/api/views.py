import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import login, logout, get_user_model
from django.contrib.auth.hashers import make_password, check_password

User = get_user_model()

@ensure_csrf_cookie
def csrf_token_view(request):
    """
    Call this endpoint from frontend to set the CSRF cookie.
    """
    return JsonResponse({'csrfToken': 'ok'})


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

    # Store password securely in Django's hashed format
    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(frontend_hashed_password)
    )
    login(request, user)
    return JsonResponse({'status': 'created', 'username': user.username})


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


def logout_view(request):
    if request.method != 'POST':
        return HttpResponseBadRequest('Only POST allowed')
    logout(request)
    return JsonResponse({'status': 'logged_out'})
