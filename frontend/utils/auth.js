export const isAuthenticated = () => {
  return localStorage.getItem('accessToken')
}

export const login = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
