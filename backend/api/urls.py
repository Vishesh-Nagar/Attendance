from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.csrf_token_view, name='csrf-token'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('me/', views.me_view, name='me'),
    path('users/', views.users_list_view, name='users-list'),
    path('subjects/', views.subjects_view, name='subjects'),
    path('subjects/<int:pk>/', views.subject_detail_view, name='subject-detail'),
]
