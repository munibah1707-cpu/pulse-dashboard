export const teamMembers = [
  { id: "m1", name: "Sara Ahmed", role: "Frontend Dev", avatar: "SA", email: "sara@pulse.io" },
  { id: "m2", name: "Bilal Khan", role: "Backend Dev", avatar: "BK", email: "bilal@pulse.io" },
  { id: "m3", name: "Ayesha Noor", role: "UI Designer", avatar: "AN", email: "ayesha@pulse.io" },
  { id: "m4", name: "Usman Tariq", role: "Project Manager", avatar: "UT", email: "usman@pulse.io" },
  { id: "m5", name: "Hira Baig", role: "QA Engineer", avatar: "HB", email: "hira@pulse.io" },
]

export const initialTasks = [
  { id: "t1", title: "Design landing page mockup", status: "done", priority: "high", assigneeId: "m3", dueDate: "2026-08-10", createdAt: "2026-08-01" },
  { id: "t2", title: "Build authentication API", status: "done", priority: "high", assigneeId: "m2", dueDate: "2026-08-12", createdAt: "2026-08-02" },
  { id: "t3", title: "Write unit tests for login", status: "inprogress", priority: "medium", assigneeId: "m5", dueDate: "2026-08-16", createdAt: "2026-08-05" },
  { id: "t4", title: "Implement dashboard charts", status: "inprogress", priority: "high", assigneeId: "m1", dueDate: "2026-08-15", createdAt: "2026-08-06" },
  { id: "t5", title: "Fix mobile responsiveness", status: "todo", priority: "medium", assigneeId: "m1", dueDate: "2026-08-18", createdAt: "2026-08-07" },
  { id: "t6", title: "Set up CI/CD pipeline", status: "overdue", priority: "high", assigneeId: "m2", dueDate: "2026-08-08", createdAt: "2026-08-03" },
  { id: "t7", title: "Create onboarding flow", status: "todo", priority: "low", assigneeId: "m3", dueDate: "2026-08-20", createdAt: "2026-08-08" },
  { id: "t8", title: "Review pull requests", status: "done", priority: "medium", assigneeId: "m4", dueDate: "2026-08-13", createdAt: "2026-08-09" },
  { id: "t9", title: "Update project documentation", status: "overdue", priority: "medium", assigneeId: "m4", dueDate: "2026-08-09", createdAt: "2026-08-04" },
  { id: "t10", title: "Performance audit", status: "todo", priority: "low", assigneeId: "m5", dueDate: "2026-08-22", createdAt: "2026-08-10" },
  { id: "t11", title: "Integrate payment gateway", status: "inprogress", priority: "high", assigneeId: "m2", dueDate: "2026-08-17", createdAt: "2026-08-11" },
  { id: "t12", title: "Design email templates", status: "todo", priority: "low", assigneeId: "m3", dueDate: "2026-08-25", createdAt: "2026-08-12" },
]

export const activityLog = [
  { id: "a1", text: "Sara completed 'Implement dashboard charts'", time: "1h ago", type: "completed" },
  { id: "a2", text: "Bilal added 'Integrate payment gateway'", time: "3h ago", type: "added" },
  { id: "a3", text: "Usman marked 'Update project documentation' as overdue", time: "5h ago", type: "overdue" },
  { id: "a4", text: "Ayesha completed 'Design landing page mockup'", time: "Yesterday", type: "completed" },
  { id: "a5", text: "Hira started 'Write unit tests for login'", time: "Yesterday", type: "added" },
  { id: "a6", text: "Bilal completed 'Build authentication API'", time: "2 days ago", type: "completed" },
]

export const weeklyStats = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 2 },
  { day: "Thu", completed: 7 },
  { day: "Fri", completed: 4 },
  { day: "Sat", completed: 6 },
  { day: "Sun", completed: 1 },
]