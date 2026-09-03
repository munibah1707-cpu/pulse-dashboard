export function useTaskStats(tasks) {
  const counts = {
    todo: 0,
    inprogress: 0,
    done: 0,
    overdue: 0,
  }

  for (const task of tasks) {
    if (counts[task.status] !== undefined) {
      counts[task.status]++
    }
  }

  const total = tasks.length
  const completionRate = total > 0 ? Math.round((counts.done / total) * 100) : 0

  return { total, counts, completionRate }
}