from django.db import models
import numpy as np
import json

class Graph(models.Model):
    size = models.IntegerField()
    density = models.FloatField()
    data = models.TextField()  # To store the graph as a JSON string

    def save_graph(self, graph: np.ndarray):
        # Convert numpy array to nested Python lists, with None for infinity
        matrix = graph.tolist()
        sanitized = [
            [None if val == float('inf') else val for val in row]
            for row in matrix
        ]
        self.data = json.dumps(sanitized)
        self.save()

    def get_graph(self) -> np.ndarray:
        # Load JSON and convert None back to infinity
        matrix = json.loads(self.data)
        restored = [
            [float('inf') if val is None else val for val in row]
            for row in matrix
        ]
        return np.array(restored)
