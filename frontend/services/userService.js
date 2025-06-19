import api from '@/lib/api'
import publicApi from '@/lib/publicApi'

export const loginUser = async data => {
  const response = await publicApi.post('/login/', data)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/users/')
  return response.data
}

export const getMe = async () => {
  const response = await api.get('/users/me/')
  return response.data
}
