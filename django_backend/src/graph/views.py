from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Graph
from .serializers import GraphSerializer

class GenerateGraph(APIView):
    def post(self, request):
        serializer = GraphSerializer(data=request.data)
        if serializer.is_valid():
            graph = serializer.save()
            return Response({
                "message": "Graph generated and stored successfully",
                "graph": GraphSerializer(graph).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, graph_id):
        try:
            graph = Graph.objects.get(id=graph_id)
            return Response(GraphSerializer(graph).data)
        except Graph.DoesNotExist:
            return Response({"message": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)
