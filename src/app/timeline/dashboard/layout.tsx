export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[var(--background)]">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}