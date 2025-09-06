'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

function SocialButton({ icon, children }) {
  return (
    <Button variant="outline" className="w-full">
      <div className="mr-2 h-4 w-4">{icon}</div>
      {children}
    </Button>
  )
}

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Mock authentication - in production this would check real auth
    const mockUser = null;
    if (mockUser) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SocialButton icon={<span>G</span>}>Google</SocialButton>
              <SocialButton icon={<span>S</span>}>Steam</SocialButton>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <SocialButton icon={<span>D</span>}>Discord</SocialButton>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <SocialButton icon={<span>TMP</span>}>TruckersMP</SocialButton>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
