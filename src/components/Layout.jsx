import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#18121E' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '224px' }}>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
          style={{ background: '#18121E', borderBottom: '1px solid #2E2040' }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: '#F1EDF7' }}>
              Good Morning 👋
            </h1>
            <p className="text-xs" style={{ color: '#9D8FAE' }}>
              Here's what's happening with your team today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: '#F43F8A22', color: '#F43F8A', border: '1px solid #F43F8A44' }}>
              PM
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}