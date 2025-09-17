from django.contrib import admin
from .models import Subject

from .models import UserProfile


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'faculty', 'present', 'absent', 'owner')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
