export const isAuthenticated = () => {
  return localStorage.getItem('accessToken')
}

export const login = (accessToken, refreshToken, userProfileObject) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  if (userProfileObject) {
    localStorage.setItem('userProfile', JSON.stringify(userProfileObject))
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userProfile')
}
