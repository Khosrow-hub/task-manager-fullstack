import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import ErrorBanner from "../components/ErrorBanner";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

const fetchTasks = async () => {
  setLoading(true);
  setError("");
  try {
    const { data } = await api.get("/api/tasks");
    setTasks(Array.isArray(data.data) ? data.data : []);
  } catch (err) {
    setError(
      err.response?.data?.message || "Failed to load tasks. Try again."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

const filtered = useMemo(() => {
  const q = search.trim().toLowerCase();
  return tasks
    .filter((t) =>
      filter === "all"
        ? true
        : filter === "done"
        ? t.status === "completed"
        : t.status !== "completed"
    )
    .filter(
      (t) =>
        !q ||
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
    );
}, [tasks, search, filter]);
  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

const handleSubmit = async (values) => {
  setSubmitting(true);
  setError("");
  try {
    if (editing) {
      const { data } = await api.put(
        `/api/tasks/${editing._id}`,
        values
      );
      const updated = data.data;
      setTasks((prev) =>
        prev.map((t) => (t._id === editing._id ? updated : t))
      );
    } else {
      const { data } = await api.post("/api/tasks", values);
      const created = data.data;
      setTasks((prev) => [created, ...prev]);
    }
    closeModal();
  } catch (err) {
    setError(
      err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Could not save the task."
    );
  } finally {
    setSubmitting(false);
  }
};

const handleToggle = async (task) => {
  const newStatus = task.status === "completed" ? "pending" : "completed";
  const snapshot = tasks;
  setTasks((prev) =>
    prev.map((t) =>
      t._id === task._id ? { ...t, status: newStatus } : t
    )
  );
  try {
    await api.put(`/api/tasks/${task._id}`, { status: newStatus });
  } catch (err) {
    setTasks(snapshot);
    setError("Could not update the task status.");
  }
};

  const handleDelete = async (task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
    try {
      await api.delete(`/api/tasks/${task._id}`);
    } catch (err) {
      setTasks(snapshot);
      setError("Could not delete the task.");
    }
  };

const counts = useMemo(
  () => ({
    total: tasks.length,
    active: tasks.filter((t) => t.status !== "completed").length,
    done: tasks.filter((t) => t.status === "completed").length,
  }),
  [tasks]
);
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              Task Manager
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openAdd}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 sm:px-4"
            >
              + Add task
            </button>
            <button
              onClick={logout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <Stat label="Total" value={counts.total} color="text-slate-800" />
          <Stat label="Active" value={counts.active} color="text-amber-600" />
          <Stat label="Done" value={counts.done} color="text-emerald-600" />
        </div>

        {/* Error */}
        <div className="mb-4">
          <ErrorBanner message={error} onDismiss={() => setError("")} />
        </div>

        {/* Filters */}
        <div className="mb-5">
          <FilterBar
            search={search}
            onSearch={setSearch}
            filter={filter}
            onFilter={setFilter}
          />
        </div>

        {/* List */}
        {loading ? (
          <Spinner label="Loading your tasks…" />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-slate-500">
              {tasks.length === 0
                ? "No tasks yet — create your first one!"
                : "No tasks match your filters."}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit task" : "New task"}
      >
        <TaskForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm sm:p-4">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}