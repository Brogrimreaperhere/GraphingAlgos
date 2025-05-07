from django.contrib import admin
from .models import Algorithm, PerformanceData, SpeedupData

@admin.register(Algorithm)
class AlgorithmAdmin(admin.ModelAdmin):
    list_display = ('name', 'algorithm_type', 'implementation_type')
    list_filter = ('algorithm_type', 'implementation_type')
    search_fields = ('name', 'description')

@admin.register(PerformanceData)
class PerformanceDataAdmin(admin.ModelAdmin):
    list_display = ('algorithm', 'graph_size', 'sequential_time', 'parallel_time', 'speedup')
    list_filter = ('algorithm__algorithm_type', 'algorithm__implementation_type')

@admin.register(SpeedupData)
class SpeedupDataAdmin(admin.ModelAdmin):
    list_display = ('algorithm', 'processor_count', 'speedup_factor')
    list_filter = ('algorithm__algorithm_type', 'algorithm__implementation_type')
