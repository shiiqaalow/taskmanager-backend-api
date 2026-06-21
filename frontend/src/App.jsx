import { useQuery } from "@tanstack/react-query"
import { Navigate, Route, Routes } from "react-router"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { LoginPage } from "./pages/auth/LoginPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { ProtectedRoutes } from "./components/auth/ProtectedRoutes"
import { AdminDashboard } from "./pages/dashboard/AdminDashboard"
import { AdminProtectedRoutes } from "./components/auth/AdminProtectedRoutes"

function App() {
  
  return (
    <div className="bg-background text-foreground">
      {/* <Siginup/> */}
      <Routes>
        <Route path = '/' element = {< Navigate to = '/register' replace /> }/>
        <Route path = '/register' element = {< RegisterPage/> } />
        <Route path = '/login' element = {< LoginPage/> } />
        <Route path = '/dashboard' element = 
          {
            <ProtectedRoutes>
              < DashboardPage/> 
            </ProtectedRoutes>
          } 
        />
        <Route path = '/admin' element = 
          {
            <AdminProtectedRoutes>
              < AdminDashboard/> 
            </AdminProtectedRoutes>
          } 
        />

      </Routes>
    </div>
  )
}

export default App
