import { useTasks } from '../context/TaskContext'

export default function Dashboard() {
  const { tasks } = useTasks()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4" style={{ color: '#F1EDF7' }}>Dashboard</h2>
      <p style={{ color: '#9D8FAE' }}>Tasks loaded: {tasks.length}</p>
    </div>
  )
}