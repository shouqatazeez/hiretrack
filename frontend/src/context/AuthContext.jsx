import { createContext, useContext, useState, useEffect } from 'react'
import api, { setAuthToken, clearAuthToken } from '../services/api'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('hiretrack_token')

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(storedToken)
        const response = await api.get('/auth/me')
        setUser(response.data)
      } catch (error) {
        console.error('Session expired or invalid token:', error)
        localStorage.removeItem('hiretrack_token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { access_token } = response.data

      setAuthToken(access_token)
      setToken(access_token)

      const userResponse = await api.get('/auth/me')
      setUser(userResponse.data)

      return userResponse.data
    } catch (error) {
      const message =
        error.response?.data?.detail || 'Login failed. Please try again.'
      throw new Error(message)
    }
  }

  const register = async (email, full_name, password) => {
    try {
      await api.post('/auth/register', { email, full_name, password })
      return await login(email, password)
    } catch (error) {
      const message =
        error.response?.data?.detail || 'Registration failed. Please try again.'
      throw new Error(message)
    }
  }

  const logout = () => {
    clearAuthToken()
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error(
      'useAuth() must be used inside an <AuthProvider>. ' +
        'Wrap your app with <AuthProvider> in main.jsx.'
    )
  }

  return context
}

export default AuthContext
