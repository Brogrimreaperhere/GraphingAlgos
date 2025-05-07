from rest_framework import serializers
from .models import Graph
from src.utils.graph import generate_random_graph

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = ['id', 'size', 'density', 'data']

    def create(self, validated_data):
        size = validated_data.get('size', 10)
        density = validated_data.get('density', 0.3)
        
        graph = generate_random_graph(size=size, density=density)
        
        graph_obj = Graph(size=size, density=density)
        graph_obj.save_graph(graph)
        
        return graph_obj

    def update(self, instance, validated_data):
        instance.size = validated_data.get('size', instance.size)
        instance.density = validated_data.get('density', instance.density)
        
        graph = generate_random_graph(size=instance.size, density=instance.density)
        instance.save_graph(graph)
        
        return instance
