import LoginForm from '@/components/LoginForm'
import { handleApiError } from '@/lib/utils'
import { loginUser } from '@/services/userService'
import { showToast } from '@/utils/ui'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from '../utils/auth'
import { isAuthenticated } from '../utils/auth'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated()){
      navigate("/")
    }
  }, [])

  const handleLogin = async (data, setError) => {
    setIsLoading(true)
    try {
      const response = await loginUser(data)
      login(response.access,response.refresh)
      showToast('LoggedIn successfully')
      navigate("/")
    } catch (error) {
      handleApiError(error, setError, 'email')
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
}
export default LoginPage
