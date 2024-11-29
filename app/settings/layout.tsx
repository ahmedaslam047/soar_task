export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8">
      <div className="mx-auto max-w-[1120px] rounded-xl bg-white p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
