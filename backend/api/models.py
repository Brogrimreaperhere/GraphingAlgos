from django.db import models

class Algorithm(models.Model):
    ALGORITHM_TYPES = (
        ('dijkstra', 'Dijkstra'),
        ('bellman_ford', 'Bellman-Ford'),
        ('floyd_warshall', 'Floyd-Warshall'),
    )
    
    IMPLEMENTATION_TYPES = (
        ('mpi', 'MPI'),
        ('cuda', 'CUDA'),
    )
    
    name = models.CharField(max_length=100)
    algorithm_type = models.CharField(max_length=20, choices=ALGORITHM_TYPES)
    implementation_type = models.CharField(max_length=20, choices=IMPLEMENTATION_TYPES)
    description = models.TextField()
    code = models.TextField()
    
    def __str__(self):
        return f"{self.name} ({self.implementation_type})"

class PerformanceData(models.Model):
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='performance_data')
    graph_size = models.IntegerField()
    sequential_time = models.FloatField()   
    parallel_time = models.FloatField()
    
    def __str__(self):
        return f"{self.algorithm.name} - {self.graph_size} nodes"
    
    @property
    def speedup(self):
        return self.sequential_time / self.parallel_time if self.parallel_time > 0 else 0

class SpeedupData(models.Model):
    algorithm = models.ForeignKey(Algorithm, on_delete=models.CASCADE, related_name='speedup_data')
    processor_count = models.IntegerField()
    speedup_factor = models.FloatField()
    
    def __str__(self):
        return f"{self.algorithm.name} - {self.processor_count} processors"
