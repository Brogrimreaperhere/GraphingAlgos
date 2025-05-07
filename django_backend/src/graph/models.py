from django.db import models
import numpy as np
import json

class Graph(models.Model):
    size = models.IntegerField()
    density = models.FloatField()
    data = models.TextField()  # To store the graph as a JSON string

    def save_graph(self, graph):
        # Store graph as a serialized string
        self.data = json.dumps(graph.tolist())  # Convert the numpy array to a list and then to JSON
        self.save()

    def get_graph(self):
        return np.array(json.loads(self.data))  # Deserialize the graph back to a numpy array
