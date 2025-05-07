from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Graph
from .serializers import GraphSerializer

class GenerateGraph(APIView):
    def post(self, request):
        # Use the serializer to validate and create the graph
        serializer = GraphSerializer(data=request.data)
        
        if serializer.is_valid():
            # Create the graph object in the database
            graph = serializer.save()
            return Response({
                "message": "Graph generated and stored successfully",
                "graph_id": graph.id,  
                "size": graph.size,
                "density": graph.density
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, graph_id):
        try:
            # Try to fetch the graph by its ID
            graph = Graph.objects.get(id=graph_id)
            # Get the serialized data for the graph
            graph_data = graph.get_graph()
            return Response({
                "graph_id": graph.id,
                "size": graph.size,
                "density": graph.density,
                "graph_data": graph_data.tolist()  # Convert the numpy array back to a list for JSON response
            })
        except Graph.DoesNotExist:
            return Response({
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)
