import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import TaskTable from '../components/TaskTable'
import { useTasks } from '../context/TaskContext'
import Modal from '../components/Modal'
import AddTaskForm from '../components/AddTaskForm'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'Done', value: 'done' },
  { label: 'Overdue', value: 'overdue' },
]

export default function Tasks() {
  const { isDark } = useTheme()
  const { tasks } = useTasks()
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length

  const filteredTasks = activeTab === 'all'
    ? tasks
    : tasks.filter(t => t.status === activeTab)

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: isDark ? '#F1EDF7' : '#18121E' }}>
            Tasks
          </h2>
          <p style={{ fontSize: 13, color: isDark ? '#9D8FAE' : '#6B5B80', marginTop: 4 }}>
            {totalTasks} total — {completedTasks} completed, {inProgressTasks} in progress, {overdueTasks} overdue
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: '#F43F8A',
            color: '#18121E',
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
              background: activeTab === tab.value ? '#F43F8A' : 'transparent',
              color: activeTab === tab.value ? 'white' : isDark ? '#9D8FAE' : '#6B5B80',
              transition: 'all 0.15s',
            }}>
            {tab.label}
            {tab.value !== 'all' && (
              <span style={{ marginLeft: 6, opacity: 0.8 }}>
                ({tasks.filter(t => t.status === tab.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task table */}
      <TaskTable filteredTasks={filteredTasks} />

      {/* Add Task modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <AddTaskForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>

    </div>
  )
}