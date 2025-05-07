import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Algorithm {
  id: number
  name: string
  algorithm_type: string
  implementation_type: string
  description: string
  code: string
  performance_data: PerformanceData[]
  speedup_data: SpeedupData[]
}

export interface PerformanceData {
  id: number
  graph_size: number
  sequential_time: number
  parallel_time: number
  speedup: number
}

export interface SpeedupData {
  id: number
  processor_count: number
  speedup_factor: number
}

export const fetchAlgorithms = async () => {
  const response = await api.get<Algorithm[]>("/algorithms/")
  return response.data
}

export const fetchAlgorithm = async (id: number) => {
  const response = await api.get<Algorithm>(`/algorithms/${id}/`)
  return response.data
}

export const fetchAlgorithmByType = async (algorithmType: string, implementationType: string) => {
  const response = await api.get<Algorithm[]>(
    `/algorithms/?algorithm_type=${algorithmType}&implementation_type=${implementationType}`,
  )
  return response.data[0] // Assuming there's only one algorithm per type/implementation combination
}

export const fetchPerformanceData = async (algorithmId: number) => {
  const response = await api.get<PerformanceData[]>(`/performance/?algorithm=${algorithmId}`)
  return response.data
}

export const fetchSpeedupData = async (algorithmId: number) => {
  const response = await api.get<SpeedupData[]>(`/speedup/?algorithm=${algorithmId}`)
  return response.data
}

export default api
