"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const Page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required")
      return false
    }
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          setError("Something went wrong")
          setIsLoading(false)
        },
        onSuccess: () => {
          setError("")
          setIsLoading(false)
          window.alert("Success")
        },
      }
    )
  }

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value)
        break
      case "email":
        setEmail(value)
        break
      case "password":
        setPassword(value)
        break
      case "confirmPassword":
        setConfirmPassword(value)
        break
    }
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4'>
      <div className='w-full max-w-md space-y-6'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
            Create Account
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Sign up to get started with your account
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
            <CardDescription className='text-center'>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Name Field */}
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <div className='relative'>
                  <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Enter your full name'
                    value={name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className='pl-10'
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className='pl-10'
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Create a password'
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className='pl-10 pr-10'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className='pl-10 pr-10'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Password must be at least 8 characters long
              </div>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className='text-center text-sm text-gray-600 dark:text-gray-400'>
                Already have an account?{" "}
                <Link
                  href='/signin'
                  className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Social Sign Up (Optional) */}
        <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80'>
          <CardContent className='pt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-300 dark:border-gray-600' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white dark:bg-gray-800 px-2 text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <Button variant='outline' disabled={isLoading}>
                <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Google
              </Button>
              <Button variant='outline' disabled={isLoading}>
                <svg className='mr-2 h-4 w-4 fill-current' viewBox='0 0 24 24'>
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
                GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Privacy */}
        <p className='text-center text-xs text-gray-600 dark:text-gray-400'>
          By creating an account, you agree to our{" "}
          <Link
            href='/terms'
            className='underline hover:text-gray-800 dark:hover:text-gray-200'
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href='/privacy'
            className='underline hover:text-gray-800 dark:hover:text-gray-200'
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
