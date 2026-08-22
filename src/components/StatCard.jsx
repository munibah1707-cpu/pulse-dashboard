import { useTheme } from '../context/ThemeContext'

export default function StatCard({ title, value, subtitle, icon, accentColor }) {
  const { isDark } = useTheme()

  return (
        <div className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 min-w-0"
      style={{
        background: isDark ? '#231A2E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
      }}>

      {/* Top row — title and icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
          {title}
        </p>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${accentColor}22`, color: accentColor }}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-bold" style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
        {value}
      </p>

      {/* Subtitle */}
      <p className="text-xs" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
        {subtitle}
      </p>
    </div>
  )
}
