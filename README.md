# GraphingAlgos
Semester Project for Parallel Computing

# Parallel Graph Algorithms Visualization Platform

This project implements **parallel versions** of three classical graph algorithms — **Dijkstra**, **Floyd-Warshall**, and **Bellman-Ford** — using both **MPI** and **CUDA**. It also includes a **full-stack web interface** that visualizes the algorithms' performance through interactive charts.

## 📌 Table of Contents

- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Technologies Used](#technologies-used)
- [System Design](#system-design)
- [Performance](#performance)
- [Screenshots](#screenshots)
- [Conclusion](#conclusion)
- [Authors](#authors)

---

## 🚀 Introduction

Graph algorithms are computationally intensive, especially for large datasets. This project explores GPU and distributed CPU-based acceleration techniques, coupled with a frontend that lets users visualize performance metrics.

---

## 🧠 Problem Statement

Graph-based problems such as routing and network optimization can be slow on large inputs. This project aims to:
- Parallelize graph algorithms using MPI and CUDA.
- Allow **real-time visualization** of algorithm performance through a web UI.

---

## 🔧 Technologies Used

### Algorithms and Backend
- **Languages:** Python, CUDA C++
- **Frameworks:** mpi4py, CuPy / PyCUDA
- **Backend:** Django with REST APIs

### Frontend
- **Framework:** React with TypeScript
- **Visualization:** Chart.js and Recharts

---

## 🛠️ System Design

### 1. Parallel Algorithm Implementations
- ✅ Dijkstra (MPI & CUDA)
- ✅ Floyd-Warshall (MPI & CUDA)
- ✅ Bellman-Ford (MPI & CUDA)

All algorithms use **2D adjacency matrices** (with `inf` for unreachable nodes) and are tested on graphs ranging from 100 to 1000 nodes.

### 2. Full-Stack Application

#### Pages:
- Landing Page
- Dijkstra MPI
- Dijkstra CUDA
- Floyd-Warshall MPI
- Floyd-Warshall CUDA
- Bellman-Ford MPI
- Bellman-Ford CUDA

---

## 📊 Performance

### 📈 Metrics
- Execution Time (ms)
- Speedup (T₁ / Tₙ)
- Scalability (time vs number of nodes)

### 🔍 Summary Table

| Algorithm          | Implementation | Speedup | Notes                          |
|-------------------|----------------|---------|--------------------------------|
| Dijkstra          | MPI            | ~3.2x   | Sparse graphs perform well     |
| Dijkstra          | CUDA           | ~12x    | Excellent on dense graphs      |
| Floyd-Warshall    | MPI            | ~2.8x   | Good for smaller matrices      |
| Floyd-Warshall    | CUDA           | ~15x    | GPU excels in matrix ops       |
| Bellman-Ford      | MPI            | ~2.5x   | Slower due to communication    |
| Bellman-Ford      | CUDA           | ~10x    | Strong GPU performance         |

---

## 🖼️ Screenshots

> Add screenshots of each algorithm page and sample bar/line graphs here (optional).

---

## 🧾 Conclusion

- Parallel processing **drastically reduces computation time**.
- CUDA consistently outperforms MPI in large datasets.
- The **interactive web interface** transforms raw data into educational insights.

---

## 👥 Authors

- Mohammad Noman, Ubaid ur Rehman, Muhammad Shaheer

