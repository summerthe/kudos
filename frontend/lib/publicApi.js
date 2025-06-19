import axios from 'axios'

import { API_URL } from '@/config'

const publicApi = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Request interceptor
publicApi.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
publicApi.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default publicApi
