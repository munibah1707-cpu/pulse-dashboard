import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Dashboard() { return <div>Dashboard Page</div> }
function Tasks() { return <div>Tasks Page</div> }
function Team() { return <div>Team Page</div> }
function Analytics() { return <div>Analytics Page</div> }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  )
}