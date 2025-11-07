"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLogin, setIsLogin] = useState(true)

  // Input handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
  }

  // Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields")
      return
    }

    // Mock login success
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", loginData.email.split("@")[0])
    alert("Login successful!")
    router.push("/")
  }

  // Signup submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password ||
      signupData.password !== signupData.confirmPassword
    ) {
      alert("Please fill in all fields and ensure passwords match")
      return
    }

    // Mock signup success
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", signupData.firstName)
    alert("Account created successfully!")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          {/* Tab Switcher */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-4 font-medium transition-colors ${
                isLogin ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-4 font-medium transition-colors ${
                !isLogin ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>

              <div>
                <Label htmlFor="login-email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link href="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </p>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Create Account</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-foreground font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-foreground font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="signup-password" className="text-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
