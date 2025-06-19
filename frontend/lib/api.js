import axios from 'axios'

import { API_URL } from '@/config'

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await axios.post(`${API_URL}/refresh-token/`, {
          refresh: refreshToken,
        })
        const { access } = response.data

        localStorage.setItem('accessToken', access)

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${access}`
        return api(originalRequest)
      } catch (error) {
        // Refresh token has also expired, redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userProfile')
        window.location.href = '/login'
      }
    }
    // Handle 403 Forbidden (user does not have permission)
    if (error?.response?.status === 403) {
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default api
