import Sidebar from './Sidebar'
import { useTheme } from '../context/ThemeContext'
import { BsSun, BsMoon, BsList } from 'react-icons/bs'
import { useState } from 'react'

export default function Layout({ children }) {
  const { isDark, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: isDark ? '#18121E' : '#F8F5FF' }}>

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', width: '224px',
        zIndex: 30,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        <Sidebar />
      </div>

      {/* Spacer for desktop only */}
      {sidebarOpen && window.innerWidth >= 900 && (
        <div style={{ width: '224px', flexShrink: 0 }} />
      )}

            {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && window.innerWidth < 900 && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 20
        }} />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: isDark ? '#18121E' : '#F8F5FF',
          borderBottom: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Toggle sidebar button — always visible */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
              width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent',
              border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
              color: isDark ? '#9D8FAE' : '#6B5B80',
            }}>
              <BsList size={20} />
            </button>

            <div>
              <h1 style={{ fontSize: 16, fontWeight: 600, color: isDark ? '#F1EDF7' : '#18121E' }}>
                {(() => {
                  const hour = new Date().getHours()
                  if (hour < 12) return 'Good Morning 👋'
                  if (hour < 17) return 'Good Afternoon 👋'
                  return 'Good Evening 👋'
                })()}
              </h1>
              <p style={{ fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
                Here's what's happening with your team today
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={toggleTheme} style={{
              width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? '#231A2E' : '#EDE6F5',
              color: isDark ? '#F43F8A' : '#9D8FAE',
              border: `1px solid ${isDark ? '#2E2040' : '#D8CCE8'}`
            }}>
              {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: '#F43F8A22', color: '#F43F8A', border: '1px solid #F43F8A44'
            }}>PM</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}