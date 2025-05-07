from rest_framework import viewsets
from .models import Algorithm, PerformanceData, SpeedupData
from .serializers import AlgorithmSerializer, PerformanceDataSerializer, SpeedupDataSerializer

class AlgorithmViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Algorithm.objects.all()
    serializer_class = AlgorithmSerializer
    
    def get_queryset(self):
        queryset = Algorithm.objects.all()
        algorithm_type = self.request.query_params.get('algorithm_type')
        implementation_type = self.request.query_params.get('implementation_type')
        
        if algorithm_type:
            queryset = queryset.filter(algorithm_type=algorithm_type)
        if implementation_type:
            queryset = queryset.filter(implementation_type=implementation_type)
            
        return queryset

class PerformanceDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PerformanceData.objects.all()
    serializer_class = PerformanceDataSerializer
    
    def get_queryset(self):
        queryset = PerformanceData.objects.all()
        algorithm_id = self.request.query_params.get('algorithm')
        
        if algorithm_id:
            queryset = queryset.filter(algorithm_id=algorithm_id)
            
        return queryset

class SpeedupDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SpeedupData.objects.all()
    serializer_class = SpeedupDataSerializer
    
    def get_queryset(self):
        queryset = SpeedupData.objects.all()
        algorithm_id = self.request.query_params.get('algorithm')
        
        if algorithm_id:
            queryset = queryset.filter(algorithm_id=algorithm_id)
            
        return queryset
