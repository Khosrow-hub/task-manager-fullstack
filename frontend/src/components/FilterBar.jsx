export default function FilterBar({ search, onSearch, filter, onFilter }) {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "done", label: "Done" },
  ];
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-9 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
      </div>
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilter(f.key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              filter === f.key
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}