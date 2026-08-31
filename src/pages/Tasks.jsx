import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import TaskTable from '../components/TaskTable'
import { useTasks } from '../context/TaskContext'
import Modal from '../components/Modal'
import AddTaskForm from '../components/AddTaskForm'
import EditTaskForm from '../components/EditTaskForm'
import { FiSearch, FiX } from 'react-icons/fi'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length

  const tabFilteredTasks = activeTab === 'all'
    ? tasks
    : tasks.filter(t => t.status === activeTab)

  const filteredTasks = searchQuery.trim()
    ? tabFilteredTasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : tabFilteredTasks

  const isModalOpen = isAddModalOpen || !!editingTask
  const closeModal = () => {
    setIsAddModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: isDark ? '#F1EDF7' : '#18121E' }}>
            Tasks
          </h2>
          <p style={{ fontSize: 13, color: isDark ? '#9D8FAE' : '#6B5B80', marginTop: 4 }}>
            {totalTasks} total — {completedTasks} completed, {inProgressTasks} in progress, {overdueTasks} overdue
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Search input */}
          <div style={{ position: 'relative' }}>
            <FiSearch
              size={14}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: isDark ? '#9D8FAE' : '#6B5B80',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              style={{
                padding: '8px 32px',
                borderRadius: 8,
                fontSize: 13,
                border: `1px solid ${isDark ? '#2E2040' : '#E8DFF5'}`,
                background: isDark ? '#18121E' : '#FFFFFF',
                color: isDark ? '#F1EDF7' : '#18121E',
                outline: 'none',
                width: 200,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#9D8FAE' : '#6B5B80',
                  display: 'flex',
                }}
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Add task button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#F43F8A',
              color: '#18121E',
              whiteSpace: 'nowrap',
            }}
          >
            + Add Task
          </button>
        </div>
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

      {/* No results message */}
      {filteredTasks.length === 0 && (
        <p style={{ fontSize: 13, color: isDark ? '#9D8FAE' : '#6B5B80', textAlign: 'center', padding: '20px 0' }}>
          No tasks match "{searchQuery}"{activeTab !== 'all' ? ` in ${tabs.find(t => t.value === activeTab)?.label}` : ''}.
        </p>
      )}

      {/* Task table */}
      {filteredTasks.length > 0 && (
        <TaskTable filteredTasks={filteredTasks} onEdit={setEditingTask} />
      )}

      {/* Add / Edit modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        {editingTask
          ? <EditTaskForm task={editingTask} onSuccess={closeModal} />
          : <AddTaskForm onSuccess={closeModal} />}
      </Modal>

    </div>
  )
}