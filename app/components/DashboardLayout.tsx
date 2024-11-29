'use client'

import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[280px]">
        <Header />
        {children}
      </main>
    </div>
  )
}

