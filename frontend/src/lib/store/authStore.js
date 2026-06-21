import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set,get) => ({
            // first set null all data
            user: null,
            token: null,
            isAuthenticated: false,

            // now save the user data and the token to use it inside every componets
            setAuth: (userData,token) => set({
                user: userData,
                token,
                isAuthenticated: true
            }),

            // clear the data after being used
            clearAuth: () => set({
                user: null,
                token: null,
                isAuthenticated: false
            }),

            // now save the token to use it outside every componets

            getToken: () => get().token
            
        }),
        // now save the data to localstorage
        {
            name: 'auth-storage',
            // now it saves all data
            // just take what you need
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)