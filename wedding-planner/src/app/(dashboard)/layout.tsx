import { AuthProvider } from '@/contexts/auth-context'
import { WeddingProvider } from '@/contexts/wedding-context'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <WeddingProvider>
        <div className="min-h-screen bg-background relative">
          <div className="absolute inset-0 bg-[url('/images/lux-pattern.png')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
          <DashboardSidebar />
          <div className="lg:pl-72">
            <DashboardHeader />
            <main className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </WeddingProvider>
    </AuthProvider>
  )
}
