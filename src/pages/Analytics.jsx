import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TaskContext'
import { teamMembers } from '../data/mockData'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts'

const priorityColors = { high: '#EF4444', medium: '#FBBF24', low: '#34D399' }
const statusConfig = {
  todo: { label: 'To Do', color: '#9D8FAE' },
  inprogress: { label: 'In Progress', color: '#FBBF24' },
  done: { label: 'Done', color: '#34D399' },
  overdue: { label: 'Overdue', color: '#EF4444' },
}

export default function Analytics() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()

  const cardStyle = {
    background: isDark ? '#231A2E' : '#FFFFFF',
    border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
    borderRadius: 12,
    padding: 20,
  }
  const textMuted = isDark ? '#9D8FAE' : '#6B5B80'
  const textMain = isDark ? '#F1EDF7' : '#18121E'

  // Priority distribution
  const priorityData = ['high', 'medium', 'low'].map(p => ({
    name: p.charAt(0).toUpperCase() + p.slice(1),
    value: tasks.filter(t => t.priority === p).length,
    key: p,
  })).filter(d => d.value > 0)

  // Member performance
  const memberData = teamMembers.map(m => {
    const memberTasks = tasks.filter(t => t.assigneeId === m.id)
    return {
      name: m.name.split(' ')[0], // first name, keeps bars compact
      completed: memberTasks.filter(t => t.status === 'done').length,
      total: memberTasks.length,
    }
  })

  // Status breakdown counts
  const statusCounts = Object.keys(statusConfig).map(key => ({
    key,
    ...statusConfig[key],
    count: tasks.filter(t => t.status === key).length,
  }))

  const tooltipStyle = {
    background: isDark ? '#231A2E' : '#FFFFFF',
    border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
    borderRadius: 8,
    fontSize: 12,
    color: textMain,
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: textMain }}>Analytics</h2>
        <p style={{ fontSize: 13, color: textMuted, marginTop: 4 }}>
          Team performance and task breakdowns
        </p>
      </div>

      {/* Status breakdown row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {statusCounts.map(s => (
          <div key={s.key} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: s.color, display: 'inline-block',
              }} />
              <p style={{ fontSize: 12, color: textMuted }}>{s.label}</p>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: textMain }}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
        gap: 16,
      }}>

        {/* Priority distribution donut */}
        <div style={cardStyle}>
          <p style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 16 }}>
            Tasks by Priority
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {priorityData.map((entry) => (
                  <Cell key={entry.key} fill={priorityColors[entry.key]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={30}
                formatter={(value) => <span style={{ color: textMuted, fontSize: 12 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Member performance bar chart */}
        <div style={cardStyle}>
          <p style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 16 }}>
            Member Performance
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={memberData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2E2040' : '#E8DFF5'} horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: textMuted, fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: isDark ? '#2E204066' : '#F8F5FF' }} />
              <Legend formatter={(value) => <span style={{ color: textMuted, fontSize: 12 }}>{value}</span>} />
              <Bar dataKey="total" name="Total" fill={isDark ? '#2E2040' : '#E8DFF5'} radius={[0, 4, 4, 0]} barSize={14} />
              <Bar dataKey="completed" name="Completed" fill="#F43F8A" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}