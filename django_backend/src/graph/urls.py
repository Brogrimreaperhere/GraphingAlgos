from django.urls import path
from .views import GenerateGraph

urlpatterns = [
    path('', GenerateGraph.as_view()),               # POST to create
    path('<int:graph_id>/', GenerateGraph.as_view()), # GET to retrieve
]