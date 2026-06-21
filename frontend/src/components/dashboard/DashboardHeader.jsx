import { ClipboardCheck } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../../lib/store/authStore'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
export const DashboardHeader = () => {
    const { user,clearAuth } = useAuthStore()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const handleLogout = () => {
        if(confirm('Are you sure, you want to logout?')) {
            clearAuth();
            // user data may still be in localstorage cuz of retry:1 from protectedRoutes
            // so stop every action may happen
            queryClient.clear()
            navigate('/login', {replace: true} )


        }
    }
  return (
    <header className='bg-card border-b border-border shadow-sm'>
        <div className="w-full px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-primary">
                    <ClipboardCheck className='h-5 w-5 text-secondary' />
                </div>
                <h1 className="text-xl font-semibold text-foreground">Task Dashboard</h1>
            </div>
            {/* user profile */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                    Welcome,
                    { user?.name || 'user' }
                </span>
                {/* logout button */}
                <Button
                    onClick={handleLogout}
                    className='rounded-md cursor-pointer border-border'
                    variant='outine'
                >
                    Logout
                </Button>
                
            </div>
        </div>
    </header>


  )
}
