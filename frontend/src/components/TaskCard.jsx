export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === "completed";
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => onToggle(task)}
            className="mt-1 h-5 w-5 cursor-pointer accent-indigo-600"
          />
          <div>
            <h3
              className={`font-semibold ${
                isDone ? "text-slate-400 line-through" : "text-slate-800"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-slate-500">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            isDone
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isDone ? "Done" : "Active"}
        </span>
      </div>
      <div className="flex gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}