import { RegisterForm } from "../../components/auth/RegisterForm"

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="absoulte inset-0 bg-gradient-to-br from-secondary to-secondary/30 opacity-50"></div>
      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 space-y-4 text-center">
          <h1 className="text-3xl font-bold text-foreground">Join Us Today</h1>
          <p>Create an account in just 2 steps</p>
        </div>
        {/* registration form */}
        <RegisterForm/>
      </div>
    </div>
  )
}

