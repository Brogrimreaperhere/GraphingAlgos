from rest_framework import serializers
from .models import Algorithm, PerformanceData, SpeedupData

class PerformanceDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceData
        fields = ['id', 'graph_size', 'sequential_time', 'parallel_time', 'speedup']

class SpeedupDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeedupData
        fields = ['id', 'processor_count', 'speedup_factor']

class AlgorithmSerializer(serializers.ModelSerializer):
    performance_data = PerformanceDataSerializer(many=True, read_only=True)
    speedup_data = SpeedupDataSerializer(many=True, read_only=True)
    
    class Meta:
        model = Algorithm
        fields = ['id', 'name', 'algorithm_type', 'implementation_type', 'description', 'code', 'performance_data', 'speedup_data']
