import { useTasks } from '../context/TaskContext'
import { teamMembers } from '../data/mockData'
import StatCard from '../components/StatCard'
import TaskTrendChart from '../components/TaskTrendChart'
import { BsCheckSquare, BsCircle, BsExclamationCircle, BsPeople } from 'react-icons/bs'
import WorkloadChart from '../components/WorkloadChart'
import StatusDonut from '../components/StatusDonut'
import ActivityFeed from '../components/ActivityFeed'

export default function Dashboard() {
  const { tasks } = useTasks()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="flex flex-col gap-6">

      {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          subtitle={`${inProgressTasks} in progress`}
          icon={<BsCircle size={18} />}
          accentColor="#F43F8A"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          subtitle={`${completionRate}% completion rate`}
          icon={<BsCheckSquare size={18} />}
          accentColor="#34D399"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          subtitle="Needs immediate attention"
          icon={<BsExclamationCircle size={18} />}
          accentColor="#EF4444"
        />
        <StatCard
          title="Team Members"
          value={teamMembers.length}
          subtitle="Active on this project"
          icon={<BsPeople size={18} />}
          accentColor="#FBBF24"
        />
      </div>

        {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskTrendChart />
        <WorkloadChart />
      </div>

       {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatusDonut />
        <div className="col-span-2">
          <ActivityFeed />
        </div>
      </div>

    </div>
  )
}