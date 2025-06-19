import LoginForm from '@/components/LoginForm'
import { handleApiError } from '@/lib/utils'
import { loginUser } from '@/services/userService'
import { showToast } from '@/utils/ui'
import { useState } from 'react'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data, setError) => {
    setIsLoading(true)
    try {
      await loginUser(data)
      showToast('LoggedIn successfully')
    } catch (error) {
      handleApiError(error, setError, 'email')
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
}
export default LoginPage
