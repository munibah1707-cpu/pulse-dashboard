import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { weeklyStats } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'

export default function TaskTrendChart() {
  const { isDark } = useTheme()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-3 py-2 rounded-lg text-sm"
          style={{
            background: isDark ? '#2E2040' : '#FFFFFF',
            border: `1px solid ${isDark ? '#3D2D50' : '#E8DFF5'}`,
            color: isDark ? '#F1EDF7' : '#18121E'
          }}>
          <p className="font-medium">{label}</p>
          <p style={{ color: '#F43F8A' }}>{payload[0].value} tasks completed</p>
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
          Task Completion Trend
        </h3>
        <p className="text-xs mt-1" style={{ color: isDark ? '#9D8FAE' : '#6B5B80' }}>
          Tasks completed per day — last 7 days
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={weeklyStats} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#2E2040' : '#F0EAF8'}
            vertical={false}
          />
          <XAxis
            dataKey="day"
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
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#F43F8A"
            strokeWidth={2.5}
            dot={{ fill: '#F43F8A', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#F43F8A' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}