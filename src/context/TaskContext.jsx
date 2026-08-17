import { createContext, useContext, useReducer, useEffect } from 'react'
import { initialTasks } from '../data/mockData'

const TaskContext = createContext()

function taskReducer(state, action) {
  switch (action.type) {

    case 'ADD_TASK':
      return [...state, action.payload]

    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      )

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload)

    case 'TOGGLE_COMPLETE':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
          : task
      )

    default:
      return state
  }
}

function getInitialTasks() {
  try {
    const saved = localStorage.getItem('pulse-tasks')
    return saved ? JSON.parse(saved) : initialTasks
  } catch {
    return initialTasks
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, getInitialTasks())

  useEffect(() => {
    localStorage.setItem('pulse-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task })
  const editTask = (task) => dispatch({ type: 'EDIT_TASK', payload: task })
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id })
  const toggleComplete = (id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id })

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}