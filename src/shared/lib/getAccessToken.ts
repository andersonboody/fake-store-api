export const getAccessToken = () => {
  const tokenString = localStorage.getItem('token')
  const token = tokenString ? JSON.parse(tokenString) : ''
  return token ? token.access : ''
}
