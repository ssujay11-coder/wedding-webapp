'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, Star } from 'lucide-react'
import { FloralDecoration, GoldSparkles } from '@/components/decorative/floral-elements'
import { motion } from 'framer-motion'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  const { signInWithGoogle, signInWithEmail, isLoading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error: authError } = await signInWithEmail(email, password)

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
    } else {
      router.push(redirect)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    const { error: authError } = await signInWithGoogle()
    if (authError) {
      setError(authError.message)
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(253,213,224,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_40%)]" />

        {/* Animated Ornaments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[-5%] right-[-5%] rotate-[-15deg] opacity-20"
        >
          <FloralDecoration variant="branch" className="w-[600px] h-[600px]" color="rose" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-[-5%] left-[-5%] opacity-15"
        >
          <FloralDecoration variant="corner" className="w-[500px] h-[500px]" color="gold" />
        </motion.div>
        <GoldSparkles className="opacity-40" />
      </div>

      {/* Left side - Experience/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#221015] to-[#4a1926] p-12 flex-col justify-between overflow-hidden">
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-[url('/images/lux-pattern.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Animated Brand Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-3 text-white group">
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500">
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </div>
            <span className="text-2xl font-display tracking-wide">Elite Wedding Planner</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 relative z-10"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-medium text-white leading-[1.1]">
            Curating Timeless
            <br />
            <span className="text-shimmer-gold italic">Celebrations</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md font-light leading-relaxed">
            Access your exclusive planning suite. Orchestrate guest experiences,
            manage budgets, and collaborate with world-class vendors.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-3xl font-display text-white">200+</p>
                <Star className="w-4 h-4 text-secondary fill-secondary" />
              </div>
              <p className="text-secondary/80 text-sm tracking-wide uppercase">Weddings Planned</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-3xl font-display text-white">100%</p>
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </div>
              <p className="text-secondary/80 text-sm tracking-wide uppercase">Delighted Couples</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/40 text-xs tracking-widest uppercase relative z-10"
        >
          &copy; {new Date().getFullYear()} Elite Wedding Planners • Excellence Since 2011
        </motion.p>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Glass Panel */}
          <div className="glass-panel-luxury p-8 md:p-10 rounded-3xl relative overflow-hidden">
            {/* Subtle top shimmer */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="bg-primary/5 p-2 rounded-full">
                  <Heart className="h-6 w-6 text-primary fill-primary" />
                </div>
                <span className="text-xl font-display font-bold text-foreground">Elite Weddings</span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-display text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground font-light">
                Sign in to continue your journey
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50/50 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 block"></span>
                {error}
              </motion.div>
            )}

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 rounded-xl hover:bg-white/50 hover:border-primary/30 transition-all duration-300 group"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2 text-primary" />
              ) : (
                <div className="bg-white p-1 rounded-full mr-3 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              )}
              <span className="text-foreground/80 font-medium">Continue with Google</span>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="px-4 text-muted-foreground bg-white/40 backdrop-blur-md rounded-full">Or with email</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 btn-luxury rounded-xl text-white font-medium text-lg mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Start planning
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  )
}
