import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TaskContext'
import { teamMembers } from '../data/mockData'

export default function WorkloadChart() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()

  // Calculate tasks per member
  const data = teamMembers.map(member => {
    const memberTasks = tasks.filter(t => t.assigneeId === member.id)
    const completed = memberTasks.filter(t => t.status === 'done').length
    const total = memberTasks.length
    return {
      name: member.name.split(' ')[0], // first name only
      total,
      completed,
    }
  })

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 rounded-lg text-sm"
          style={{
            background: isDark ? '#2E2040' : '#FFFFFF',
            border: `1px solid ${isDark ? '#3D2D50' : '#E8DFF5'}`,
            color: isDark ? '#F1EDF7' : '#18121E'
          }}>
          <p className="font-medium mb-1">{label}</p>
          <p style={{ color: '#F43F8A' }}>Total: {payload[0].value} tasks</p>
          <p style={{ color: '#34D399' }}>Completed: {payload[1].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="rounded-xl p-5"
      style={{
        background: isDark ? '#231A2E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
      }}>

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold" style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
          Team Workload
        </h3>
        <p className="text-xs mt-1" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
          Tasks assigned per team member
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#2E2040' : '#F0EAF8'}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: isDark ? '#9D8FAE' : '#6B5B80' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: isDark ? '#9D8FAE' : '#6B5B80' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#F43F8A44" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#F43F8A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}