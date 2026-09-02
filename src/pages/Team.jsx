import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TaskContext'
import { teamMembers } from '../data/mockData'

const statusConfig = {
  todo: { label: 'To Do', color: '#9D8FAE' },
  inprogress: { label: 'In Progress', color: '#FBBF24' },
  done: { label: 'Done', color: '#34D399' },
  overdue: { label: 'Overdue', color: '#EF4444' },
}

export default function Team() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()

  const getMemberStats = (memberId) => {
    const memberTasks = tasks.filter(t => t.assigneeId === memberId)
    const total = memberTasks.length
    const counts = {
      todo: memberTasks.filter(t => t.status === 'todo').length,
      inprogress: memberTasks.filter(t => t.status === 'inprogress').length,
      done: memberTasks.filter(t => t.status === 'done').length,
      overdue: memberTasks.filter(t => t.status === 'overdue').length,
    }
    return { total, counts }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: isDark ? '#F1EDF7' : '#18121E' }}>
          Team
        </h2>
        <p style={{ fontSize: 13, color: isDark ? '#9D8FAE' : '#6B5B80', marginTop: 4 }}>
          {teamMembers.length} members
        </p>
      </div>

      {/* Member grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {teamMembers.map(member => {
          const { total, counts } = getMemberStats(member.id)
          const doneRatio = total > 0 ? Math.round((counts.done / total) * 100) : 0

          return (
            <div
              key={member.id}
              className="rounded-xl"
              style={{
                background: isDark ? '#231A2E' : '#FFFFFF',
                border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
                padding: 20,
              }}
            >
              {/* Avatar + name + role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                  background: '#F43F8A22', color: '#F43F8A',
                  flexShrink: 0,
                }}>
                  {member.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 600,
                    color: isDark ? '#F1EDF7' : '#18121E',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {member.name}
                  </p>
                  <p style={{ fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Email */}
              <p style={{
                fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80',
                marginBottom: 16, wordBreak: 'break-all',
              }}>
                {member.email}
              </p>

              {/* Task summary */}
              <div style={{
                borderTop: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
                paddingTop: 14,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
                    {total} task{total !== 1 ? 's' : ''} assigned
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#F43F8A' }}>
                    {doneRatio}% done
                  </p>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: 6, borderRadius: 4, overflow: 'hidden',
                  background: isDark ? '#18121E' : '#F8F5FF',
                  marginBottom: 12,
                }}>
                  <div style={{
                    width: `${doneRatio}%`, height: '100%',
                    background: '#F43F8A', transition: 'width 0.3s',
                  }} />
                </div>

                {/* Status breakdown chips */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    counts[key] > 0 && (
                      <span key={key} style={{
                        fontSize: 11, fontWeight: 500,
                        color: cfg.color,
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: cfg.color, display: 'inline-block',
                        }} />
                        {counts[key]} {cfg.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}