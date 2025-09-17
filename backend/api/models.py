from django.db import models
from django.conf import settings


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'created_at': self.created_at.isoformat(),
        }

    def __str__(self):
        return f"Profile({self.user.username})"


class Subject(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE, related_name='subjects')
    title = models.CharField(max_length=200)
    faculty = models.CharField(max_length=200, blank=True)
    present = models.PositiveIntegerField(default=0)
    absent = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['id']

    def to_dict(self):
        return {
            'id': self.id,
            'owner': self.owner.id if self.owner else None,
            'owner_username': self.owner.username if self.owner else None,
            'title': self.title,
            'faculty': self.faculty,
            'present': self.present,
            'absent': self.absent,
        }

    def __str__(self):
        return f"{self.title} ({self.faculty})"
