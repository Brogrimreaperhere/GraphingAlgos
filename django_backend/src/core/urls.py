from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='admin/', permanent=True)),
    path('admin/', admin.site.urls),
    path('api/mpi/', include('src.mpi.urls')),
    path('api/cuda/', include('src.cuda.urls')),
]
