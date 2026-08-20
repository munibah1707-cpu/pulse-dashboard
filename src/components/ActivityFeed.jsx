import { useTheme } from '../context/ThemeContext'
import { activityLog } from '../data/mockData'
import { BsCheckCircle, BsPlusCircle, BsExclamationCircle } from 'react-icons/bs'

const typeConfig = {
  completed: { icon: <BsCheckCircle size={15} />, color: '#34D399' },
  added: { icon: <BsPlusCircle size={15} />, color: '#F43F8A' },
  overdue: { icon: <BsExclamationCircle size={15} />, color: '#EF4444' },
}

export default function ActivityFeed() {
  const { isDark } = useTheme()

  return (
    <div className="rounded-xl p-5 flex flex-col"
      style={{
        background: isDark ? '#231A2E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
      }}>

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
          Recent Activity
        </h3>
        <p className="text-xs mt-1" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
          Latest updates from your team
        </p>
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-4">
        {activityLog.map((entry, index) => {
          const config = typeConfig[entry.type]
          return (
            <div key={entry.id} className="flex items-start gap-3">
              {/* Icon */}
              <div className="mt-0.5 flex-shrink-0" style={{ color: config.color }}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed"
                  style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
                  {entry.text}
                </p>
                <p className="text-xs mt-1" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
                  {entry.time}
                </p>
              </div>

              {/* Divider — not on last item */}
              {index < activityLog.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}