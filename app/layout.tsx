import { Toaster } from '@/components/ui/custom-sonner'
import { fontSans, fontMono } from '@/lib/fonts'
import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/contexts/providers/UserProvider'
import { DashboardLayout } from './components/DashboardLayout'

export const metadata: Metadata = {
  title: 'Soar Task',
  description: 'Soar Task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`light ${fontSans.variable} ${fontMono.variable}`}>
      <body className="font-sans antialiased">
        <UserProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  )
}

