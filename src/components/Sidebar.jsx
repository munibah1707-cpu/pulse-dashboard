import { NavLink } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { BsCheckSquare, BsPeople, BsBarChart } from 'react-icons/bs'

const navItems = [
  { path: '/', label: 'Dashboard', icon: <RxDashboard size={18} /> },
  { path: '/tasks', label: 'Tasks', icon: <BsCheckSquare size={18} /> },
  { path: '/team', label: 'Team', icon: <BsPeople size={18} /> },
  { path: '/analytics', label: 'Analytics', icon: <BsBarChart size={18} /> },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 flex flex-col"
      style={{ background: '#231A2E', borderRight: '1px solid #2E2040' }}>

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5"
        style={{ borderBottom: '1px solid #2E2040' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: '#F43F8A' }}>
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="font-semibold text-lg" style={{ color: '#F1EDF7' }}>Pulse</span>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        <p className="text-xs font-medium px-3 mb-2" style={{ color: '#9D8FAE' }}>MAIN MENU</p>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'font-medium'
                  : 'hover:opacity-80'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? '#F43F8A22' : 'transparent',
              color: isActive ? '#F43F8A' : '#9D8FAE',
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom user area */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #2E2040' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#F43F8A', color: 'white' }}>
            PM
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: '#F1EDF7' }}>Project Manager</p>
            <p className="text-xs" style={{ color: '#9D8FAE' }}>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}