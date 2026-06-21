import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../utils/errorUtils'
import { useAuthStore } from '../../lib/store/authStore'

export const LoginForm = () => {

  const [ fromData, setFromData ] = useState({ email: '', password: '' })
  const [ error, setError ] = useState(null)
  const [ success,setSuccess ] = useState(null)
  const { setAuth } = useAuthStore()

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/login', userData)
      return response.data
    },
    onSuccess: (data) => {
      setSuccess('Account Logged in! Redirecting to Dashboard...')
      if(data.token) {
        const user = data.user
        const token = data.token
        setAuth(user,token)
        navigate('/dashboard')
      }
    },
    onError: (error) => {
      setError(extractErrorMessages(error))
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFromData({
      ...fromData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    loginMutation.mutate({
      email: fromData.email,
      password: fromData.password
    })
  }

  return (
    <Card className="w-full border-border rounded-md bg-secondary/20">
      <CardHeader className="space-y-5 py-4">
        <CardTitle className="text-2xl text-center">Signin</CardTitle>
        <CardDescription className="text-sm">Enter your credentials to access your account</CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            { error && (
              <div className="bg-destructive/20 text-destructive p-3 rounded-md">
                { error }
              </div>
            )}
            { success && (
              <div className="bg-primary/10 text-primary p-3 rounded-md">
                { success }
              </div>
            )}
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className='text-sm font-medium text-left'>Email</label>
              <Input 
                type = 'email'
                name = 'email' 
                placeholder = 'Jane Doe@example.com'
                required
                value = {fromData.email}
                onChange = {handleInputChange}
                className="rounded-md py-5"
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className='text-sm font-medium text-left'>Password</label>
              <Input 
                type = 'password'
                name = 'password' 
                placeholder = '*******'
                required
                value = {fromData.password}
                onChange = {handleInputChange}
                className="rounded-md py-5"
              />
            </div>
          </CardContent>
          <div className="p-4">
             <Button type = 'submit' className={"w-full rounded-md py-5"}  disabled={loginMutation.isPending} >
              { loginMutation.isPending 
                ? ( <span className='flex items-center gap-3'> <LoaderCircle  className="animate-spin"/> Signing in... </span> ) 
                : ( <span> Sign in </span> ) 
              }
            </Button>
          </div>
          <CardFooter className="flex justify-center items-center">
            <div className="text-sm">
              Don't have an account ? <a onClick={() => navigate("/register")} className='text-primary hover:underline cursor-pointer'>Sign up</a>
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  )
}