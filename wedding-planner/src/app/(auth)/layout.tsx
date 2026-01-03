import { AuthProvider } from '@/contexts/auth-context'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-rose-50">
        {children}
      </div>
    </AuthProvider>
  )
}
