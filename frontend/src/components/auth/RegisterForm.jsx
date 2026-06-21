import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CheckCircle2, LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../utils/errorUtils'

// export const SubmitButton = () => {
//   const { pending } = useActionState()
//   return(
//     <Button type = 'submit' className={"w-full rounded-md py-5"} >
//       { pending 
//         ? ( <span className='flex items-center gap-3'> <LoaderCircle/> Creating account... </span> ) 
//         : ( <span> Create account </span> ) 
//       }
//     </Button>
//   )
// }


export const RegisterForm = () => {

  const [ formData,setFormData ] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [ success,setSuccess ] = useState(null)
  const [ error,setError ] = useState(null)

  const navigate = useNavigate()


  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register' ,userData )
      return response.data
    },
    onSuccess: (data) => {
      setSuccess('Account created! Redirecting to sign in...')
      setTimeout(() => {
        navigate('/signin') 
      }, 2000);
    },
    onError: (error) => {
      setError(extractErrorMessages(error))
    }
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target
      setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if(!formData.name || !formData.email || !formData.password ) {
      setError('All fields are required')
      return
    }
    if(formData.confirmPassword !== formData.password) {
      setError('passwords do not match')
      return
    }
    
    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })

  }

  return (
    <Card className="w-full border-border rounded-md bg-secondary/20">
      <CardHeader className="space-y-3 py-4">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-sm text-center">Enter your details to register </CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            { error && (
              <div className="bg-destructive/20 text-destructive p-3 rounded-md flex items-center gap-2">
                <span className='bg-destructive/20 w-5 h-5 flex justify-center items-center rounded-md'> <X size={15}/> </span>
                { error }
              </div>
            )}
            { success && (
              <div className="bg-primary/10 text-primary p-3 rounded-md flex items-center gap-2">
                <span className='bg-primary/20 w-5 h-5 flex justify-center items-center rounded-md'> <CheckCircle2 size={15}/> </span>
                { success }
              </div>
            )}
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="Fullname" className='text-sm font-medium text-left'>Full Name</label>
              <Input 
                type = 'text'
                name = 'name'
                value = { formData.name }
                onChange = {handleInputChange} 
                placeholder = 'Jane Doe'
                required
                className="rounded-md py-5"

              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="Fullname" className='text-sm font-medium text-left'>Email</label>
              <Input 
                type = 'text'
                name = 'email'
                value = { formData.email }
                onChange = {handleInputChange}
                placeholder = 'Jane Doe@example.com'
                required
                className="rounded-md py-5"
              />
            </div>
              {/* Password */}
            <div className="space-y-2">
              <label htmlFor="Fullname" className='text-sm font-medium text-left'>Password</label>
              <Input 
                type = 'password'
                name = 'password'
                value = { formData.password }
                onChange = {handleInputChange} 
                placeholder = '*******'
                required
                className="rounded-md py-5"
              />
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="Fullname" className='text-sm font-medium text-left'>RE-type password</label>
              <Input 
                type = 'password'
                name = 'confirmPassword'
                value = { formData.confirmPassword }
                onChange = {handleInputChange} 
                placeholder = '*********'
                required
                className="rounded-md py-5"
              />
            </div>
            
          </CardContent>
          <div className="p-4">
            <Button type = 'submit' className={"w-full rounded-md py-5"}  disabled={registerMutation.isPending} >
              { registerMutation.isPending 
                ? ( <span className='flex items-center gap-3'> <LoaderCircle  className="animate-spin"/> Creating account... </span> ) 
                : ( <span> Create account </span> ) 
              }
            </Button>
          </div>
          <CardFooter className="flex justify-center items-center">
            <p className="text-sm">
              Already have an account ? <a onClick={() => navigate("/login")} className='text-primary hover:underline cursor-pointer'>Sign in</a>
            </p>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  )
}
