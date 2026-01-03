'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Mail, Lock, Eye, EyeOff, Loader2, User, Check, Star } from 'lucide-react'
import { FloralDecoration, GoldSparkles } from '@/components/decorative/floral-elements'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const router = useRouter()
  const { signInWithGoogle, signUpWithEmail, isLoading: authLoading } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [accountType, setAccountType] = useState<'couple' | 'planner'>('couple')

  // Password validation
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(password) },
  ]

  const isPasswordValid = passwordRequirements.every((req) => req.met)
  const doPasswordsMatch = password === confirmPassword && password.length > 0

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!isPasswordValid) {
      setError('Please meet all password requirements')
      setIsLoading(false)
      return
    }

    if (!doPasswordsMatch) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const { error: authError } = await signUpWithEmail(email, password, fullName)

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
    } else {
      setSuccess(true)
    }
  }

  const handleGoogleSignup = async () => {
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--background)] relative overflow-hidden">
        {/* Success Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <FloralDecoration variant="pattern" className="w-full h-full" color="rose" />
        </div>

        <div className="max-w-md text-center space-y-6 relative z-10 glass-panel-luxury p-8 rounded-3xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-20 h-20 bg-green-100/50 rounded-full flex items-center justify-center shadow-inner"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-display text-foreground">
            Check Your Email
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We&apos;ve sent a confirmation link to <strong className="text-primary">{email}</strong>.
            Click the link to verify your account and start planning your wedding.
          </p>
          <Button
            onClick={() => router.push('/login')}
            className="btn-luxury w-full py-6 text-white rounded-xl"
          >
            Return to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(253,213,224,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_40%)]" />

        {/* Animated Ornaments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[-5%] left-[-5%] opacity-20"
        >
          <FloralDecoration variant="corner" className="w-[600px] h-[600px]" color="gold" />
        </motion.div>
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#221015] to-[#4a1926] p-12 flex-col justify-between overflow-hidden">
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-[url('/images/lux-pattern.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

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
            Start Your
            <br />
            <span className="text-shimmer-gold italic">Journey</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md font-light">
            Join thousands of couples creating their dream celebrations with our award-winning platform.
          </p>

          <div className="space-y-4 pt-4">
            {[
              "Guest list & RSVP management",
              "Beautiful wedding website",
              "Budget tracking & vendor booking",
              "50+ premium venue options"
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-white/90 font-light tracking-wide">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/40 text-xs tracking-widest uppercase relative z-10"
        >
          &copy; {new Date().getFullYear()} Elite Wedding Planners
        </motion.p>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md my-auto"
        >
          <div className="glass-panel-luxury p-8 md:p-10 rounded-3xl relative">
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
                Create Your Account
              </h2>
              <p className="text-muted-foreground font-light">
                Begin planning your perfect celebration
              </p>
            </div>

            {/* Account Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setAccountType('couple')}
                className={`flex-1 p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${accountType === 'couple'
                    ? 'border-primary bg-primary/5 shadow-inner'
                    : 'border-border hover:border-primary/50 bg-white/50'
                  }`}
              >
                <div className="relative z-10">
                  <div className="font-display font-medium text-lg mb-1 flex items-center justify-center gap-2">
                    <Heart className={`w-4 h-4 ${accountType === 'couple' ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    <span className={accountType === 'couple' ? 'text-primary' : 'text-foreground'}>Couple</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Planning my wedding</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('planner')}
                className={`flex-1 p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${accountType === 'planner'
                    ? 'border-primary bg-primary/5 shadow-inner'
                    : 'border-border hover:border-primary/50 bg-white/50'
                  }`}
              >
                <div className="relative z-10">
                  <div className="font-display font-medium text-lg mb-1 flex items-center justify-center gap-2">
                    <Star className={`w-4 h-4 ${accountType === 'planner' ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    <span className={accountType === 'planner' ? 'text-primary' : 'text-foreground'}>Planner</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Managing clients</div>
                </div>
              </button>
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

            {/* Google Signup */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 rounded-xl hover:bg-white/50 hover:border-primary/30 transition-all duration-300 group"
              onClick={handleGoogleSignup}
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

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground/80 font-medium">Full Name</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <User className="h-4 w-4" />
                  </div>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-10 bg-white/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                    required
                  />
                </div>
              </div>

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
                    className="pl-10 h-10 bg-white/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 bg-white/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
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
                {/* Password Requirements */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${req.met
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-gray-50 text-gray-400 border-gray-100'
                        }`}
                    >
                      {req.met && <Check className="h-3 w-3" />}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground/80 font-medium">Confirm Password</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 h-10 bg-white/50 focus:ring-primary/20 rounded-xl transition-all ${confirmPassword && !doPasswordsMatch
                        ? 'border-red-300 focus:border-red-500'
                        : confirmPassword && doPasswordsMatch
                          ? 'border-green-300 focus:border-green-500'
                          : 'border-primary/10 focus:border-primary/50'
                      }`}
                    required
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {doPasswordsMatch ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-red-500 text-[10px] uppercase font-bold">No match</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 btn-luxury rounded-xl text-white font-medium text-lg mt-4"
                disabled={isLoading || !isPasswordValid || !doPasswordsMatch}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center px-4 leading-tight">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
