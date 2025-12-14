// /src/components/EventForm.jsx
import { useEffect, useMemo, useState } from "react";

// Helpers
function pad(n) {
  return n.toString().padStart(2, "0");
}

function toLocalInputValue(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  const year = dt.getFullYear();
  const month = pad(dt.getMonth() + 1);
  const day = pad(dt.getDate());
  const hours = pad(dt.getHours());
  const minutes = pad(dt.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function fromLocalInputValue(str) {
  return str ? new Date(str) : null;
}

export default function CalendarEvent({
  initial,
  mode = "create", // "create" | "edit"
  onSubmit,
  onCancel,
  onDelete,
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [start, setStart] = useState(
    toLocalInputValue(initial?.start || new Date())
  );
  const [end, setEnd] = useState(toLocalInputValue(initial?.end || new Date()));
  const [allDay, setAllDay] = useState(!!initial?.allDay);
  const [color, setColor] = useState(initial?.color || "#3b82f6");
  const [notes, setNotes] = useState(initial?.notes || "");

  useEffect(() => {
    if (start && end && new Date(end) < new Date(start)) {
      setEnd(start);
    }
  }, [start, end]);

  const canSubmit = useMemo(
    () => title.trim() && start && end,
    [title, start, end]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      title: title.trim(),
      start: fromLocalInputValue(start),
      end: fromLocalInputValue(end),
      allDay,
      color,
      notes: notes.trim(),
    };

    onSubmit && onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />
      </div>

      {/* Date / Time */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Start
          </label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            End
          </label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
      </div>

      {/* All day + Color */}
      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            // checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
          />
          <span className="text-sm text-gray-700">All day</span>
        </label>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <input
            type="color"
            className="h-9 w-12 cursor-pointer rounded border border-gray-300"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          className="min-h-[96px] w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800"
          placeholder="Enter pooja service details"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 bg-orange-400"
        >
          Cancel
        </button>

        {mode === "edit" && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className={`rounded-lg px-4 py-2 font-medium text-white ${
            canSubmit
              ? "bg-slate-800 hover:bg-slate-900"
              : "bg-slate-500 cursor-not-allowed"
          }`}
        >
          {mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
