import { useTheme } from '../context/ThemeContext'
import TaskTable from '../components/TaskTable'
import { useTasks } from '../context/TaskContext'

export default function Tasks() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: isDark ? '#F1EDF7' : '#18121E' }}>
            Tasks
          </h2>
          <p style={{ fontSize: 13, color: isDark ? '#9D8FAE' : '#6B5B80', marginTop: 4 }}>
            {totalTasks} total tasks — {completedTasks} completed, {inProgressTasks} in progress, {overdueTasks} overdue
          </p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['All', 'To Do', 'In Progress', 'Done', 'Overdue'].map(tab => (
          <button key={tab} style={{
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
            background: tab === 'All' ? '#F43F8A' : 'transparent',
            color: tab === 'All' ? 'white' : isDark ? '#9D8FAE' : '#6B5B80',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Task table */}
      <TaskTable />

    </div>
  )
}