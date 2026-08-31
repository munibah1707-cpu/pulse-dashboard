import { useTasks } from '../context/TaskContext'
import { teamMembers } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const priorityConfig = {
  high: { label: 'High', bg: '#EF444422', color: '#EF4444' },
  medium: { label: 'Medium', bg: '#FBBF2422', color: '#FBBF24' },
  low: { label: 'Low', bg: '#34D39922', color: '#34D399' },
}

const statusConfig = {
  todo: { label: 'To Do', bg: '#9D8FAE22', color: '#9D8FAE' },
  inprogress: { label: 'In Progress', bg: '#FBBF2422', color: '#FBBF24' },
  done: { label: 'Done', bg: '#34D39922', color: '#34D399' },
  overdue: { label: 'Overdue', bg: '#EF444422', color: '#EF4444' },
}

export default function TaskTable({ filteredTasks, onEdit }) {
  const { tasks, deleteTask } = useTasks()
  const taskList = filteredTasks || tasks
  const { isDark } = useTheme()

  const getMemberName = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId)
    return member ? member.name : 'Unassigned'
  }

  const getMemberAvatar = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId)
    return member ? member.avatar : '??'
  }

  const handleDelete = (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`)
    if (confirmed) deleteTask(task.id)
  }

  return (
    <div className="rounded-xl overflow-hidden"
      style={{
        background: isDark ? '#231A2E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
      }}>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.7fr',
        padding: '12px 20px',
        borderBottom: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
        background: isDark ? '#1E1428' : '#F8F5FF',
      }}>
        {['Task', 'Priority', 'Status', 'Assignee', 'Due Date', 'Actions'].map(col => (
          <p key={col} style={{ fontSize: 12, fontWeight: 500, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
            {col}
          </p>
        ))}
      </div>

      {/* Task rows */}
      {taskList.map((task, index) => {
        const priority = priorityConfig[task.priority]
        const status = statusConfig[task.status]

        return (
          <div key={task.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.7fr',
              padding: '14px 20px',
              alignItems: 'center',
              borderBottom: index < taskList.length - 1
                ? `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`
                : 'none',
              transition: 'background 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? '#2E2040' : '#F8F5FF'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Title */}
            <p style={{ fontSize: 13, color: isDark ? '#F1EDF7' : '#18121E', fontWeight: 500 }}>
              {task.title}
            </p>

            {/* Priority badge */}
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px',
              borderRadius: 20, width: 'fit-content',
              background: priority.bg, color: priority.color
            }}>
              {priority.label}
            </span>

            {/* Status badge */}
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px',
              borderRadius: 20, width: 'fit-content',
              background: status.bg, color: status.color
            }}>
              {status.label}
            </span>

            {/* Assignee */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                background: '#F43F8A22', color: '#F43F8A',
              }}>
                {getMemberAvatar(task.assigneeId)}
              </div>
              <p style={{ fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
                {getMemberName(task.assigneeId)}
              </p>
            </div>

            {/* Due date */}
            <p style={{ fontSize: 12, color: isDark ? '#9D8FAE' : '#6B5B80' }}>
              {task.dueDate}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => onEdit?.(task)}
                aria-label={`Edit ${task.title}`}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: isDark ? '#9D8FAE' : '#6B5B80', padding: 4, display: 'flex',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F43F8A'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#9D8FAE' : '#6B5B80'}
              >
                <FiEdit2 size={14} />
              </button>
              <button
                onClick={() => handleDelete(task)}
                aria-label={`Delete ${task.title}`}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: isDark ? '#9D8FAE' : '#6B5B80', padding: 4, display: 'flex',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#9D8FAE' : '#6B5B80'}
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}