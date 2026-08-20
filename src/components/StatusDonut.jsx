import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TaskContext'

const COLORS = {
  todo: '#9D8FAE',
  inprogress: '#FBBF24',
  done: '#34D399',
  overdue: '#EF4444',
}

const LABELS = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
  overdue: 'Overdue',
}

export default function StatusDonut() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()

  const data = Object.keys(COLORS).map(status => ({
    name: LABELS[status],
    value: tasks.filter(t => t.status === status).length,
    color: COLORS[status],
  })).filter(d => d.value > 0)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 rounded-lg text-sm"
          style={{
            background: isDark ? '#2E2040' : '#FFFFFF',
            border: `1px solid ${isDark ? '#3D2D50' : '#E8DFF5'}`,
            color: isDark ? '#F1EDF7' : '#18121E'
          }}>
          <p className="font-medium" style={{ color: payload[0].payload.color }}>
            {payload[0].name}
          </p>
          <p>{payload[0].value} tasks</p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = () => (
    <div className="flex flex-wrap gap-3 justify-center mt-3">
      {data.map(entry => (
        <div key={entry.name} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
          <span className="text-xs" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
            {entry.name} ({entry.value})
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="rounded-xl p-5"
      style={{
        background: isDark ? '#231A2E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
      }}>

      {/* Header */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold" style={{ color: isDark ? '#F1EDF7' : '#18121E' }}>
          Task Status Breakdown
        </h3>
        <p className="text-xs mt-1" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
          Distribution across all statuses
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend />
    </div>
  )
}