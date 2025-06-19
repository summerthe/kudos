import api from '@/lib/api'

export const getGivenKudos = async () => {
  const response = await api.get('/kudos/?direction=given')
  return response.data
}

export const getReceivedKudos = async () => {
  const response = await api.get('/kudos/')
  return response.data
}

export const createKudo = async data => {
  const response = await api.post('/kudos/', data)
  return response.data
}
