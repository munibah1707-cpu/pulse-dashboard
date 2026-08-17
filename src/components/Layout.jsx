import Sidebar from './Sidebar'
import { useTheme } from '../context/ThemeContext'
import { BsSun, BsMoon } from 'react-icons/bs'

export default function Layout({ children }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen" style={{ background: isDark ? '#18121E' : '#F8F5FF' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '224px' }}>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
          style={{
            background: isDark ? '#18121E' : '#F8F5FF',
            borderBottom: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
          }}>
          <div>
             <h1 className="text-lg font-semibold" style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
               {(() => {
                const hour = new Date().getHours()
                if (hour < 12) return 'Good Morning 👋'
                if (hour < 17) return 'Good Afternoon 👋'
                return 'Good Evening 👋'
               })()}
</h1>
            <p className="text-xs" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
              Here's what's happening with your team today
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: isDark ? '#231A2E' : '#EDE6F5',
                color: isDark ? '#F43F8A' : '#9D8FAE',
                border: `1px solid ${isDark ? '#2E2040' : '#D8CCE8'}`
              }}>
              {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>

            {/* Avatar */}
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