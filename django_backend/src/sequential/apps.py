from django.apps import AppConfig


class SequentialConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.sequential'
