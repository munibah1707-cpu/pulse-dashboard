import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { teamMembers } from "../data/mockData";

const PRIORITIES = ["high", "medium", "low"];
const STATUSES = ["todo", "inprogress", "done", "overdue"];
const STATUS_LABELS = { todo: "To Do", inprogress: "In Progress", done: "Done", overdue: "Overdue" };
const PRIORITY_LABELS = { high: "High", medium: "Medium", low: "Low" };

export default function EditTaskForm({ task, onSuccess }) {
  const { editTask } = useTasks();
  const { isDark } = useTheme();

  const inputStyle = {
    backgroundColor: isDark ? "#18121E" : "#FFFFFF",
    borderColor: isDark ? "#2E2040" : "#E8DFF5",
    color: isDark ? "#F1EDF7" : "#18121E",
  };
  const labelColor = isDark ? "#9D8FAE" : "#6B5B80";

  const [form, setForm] = useState({
    title: task.title,
    assigneeId: task.assigneeId,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    editTask({
      ...task,
      title: form.title.trim(),
      status: form.status,
      priority: form.priority,
      assigneeId: form.assigneeId,
      dueDate: form.dueDate,
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm mb-1" style={{ color: labelColor }}>Title</label>
        <input
          type="text" name="title" value={form.title} onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
          style={{ ...inputStyle, ["--tw-ring-color"]: "#F43F8A" }}
        />
        {error && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{error}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1" style={{ color: labelColor }}>Assignee</label>
        <select
          name="assigneeId" value={form.assigneeId} onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
          style={{ ...inputStyle, ["--tw-ring-color"]: "#F43F8A" }}
        >
          {teamMembers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1" style={{ color: labelColor }}>Priority</label>
          <select
            name="priority" value={form.priority} onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
            style={{ ...inputStyle, ["--tw-ring-color"]: "#F43F8A" }}
          >
            {PRIORITIES.map((p) => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: labelColor }}>Status</label>
          <select
            name="status" value={form.status} onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
            style={{ ...inputStyle, ["--tw-ring-color"]: "#F43F8A" }}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1" style={{ color: labelColor }}>Due Date</label>
        <input
          type="date" name="dueDate" value={form.dueDate} onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
          style={{ ...inputStyle, ["--tw-ring-color"]: "#F43F8A" }}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-md py-2 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#F43F8A", color: "#18121E" }}
      >
        Save Changes
      </button>
    </form>
  );
}