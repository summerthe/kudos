import api from 'lib/api'

export const getGivenKudos = async () => {
  const response = await api.get('/kudos/')
  return response.data
}

export const getReceivedKudos = async () => {
  const response = await api.get('/kudos/?direction=received')
  return response.data
}

export const createKudo = async data => {
  const response = await api.post('/kudos/me/', data)
  return response.data
}
