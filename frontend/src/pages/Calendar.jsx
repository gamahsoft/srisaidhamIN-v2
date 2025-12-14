// /src/components/Calendar.jsx
import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  useCreateEvent,
  useDeleteEvent,
  useEvents,
  useUpdateEvent,
} from "../features/slices/calendarSlice.js";
import { useSelector } from "react-redux";
import Modal from "../components/Modal.jsx";
import EventForm from "../components/CalendarEvent.jsx";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [range, setRange] = useState();
  const { data: events = [], isLoading } = useEvents(range);

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const defaultView = useSelector(
    (s) => (s.ui && s.ui.defaultView) || "dayGridMonth"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setDraft(null);
  };

  const onDatesSet = (arg) => {
    setRange({ start: arg.startStr, end: arg.endStr });
  };

  const onDateClick = (arg) => {
    const start = new Date(arg.date);
    const end = new Date(arg.date);

    if (!arg.allDay && arg.view.type !== "dayGridMonth") {
      end.setHours(end.getHours() + 1);
    }

    setEditing(null);
    setDraft({
      title: "",
      start,
      end,
      allDay: arg.allDay || arg.view.type === "dayGridMonth",
      color: "#3b82f6",
      notes: "",
    });

    setModalOpen(true);
  };

  const onEventClick = (info) => {
    const e = info.event.extendedProps;

    setEditing(e);
    setDraft({
      title: e.title,
      start: info.event.start,
      end: info.event.end || info.event.start,
      allDay: !!e.allDay,
      color: e.color || "#3b82f6",
      notes: e.notes || "",
    });

    setModalOpen(true);
  };

  const onEventDrop = async (arg) => {
    const id = arg.event.extendedProps._id;

    await updateEvent.mutateAsync({
      id,
      updates: {
        start: arg.event.start,
        end: arg.event.end || arg.event.start,
      },
    });
  };

  const onEventResize = async (arg) => {
    const id = arg.event.extendedProps._id;

    await updateEvent.mutateAsync({
      id,
      updates: {
        start: arg.event.start,
        end: arg.event.end,
      },
    });
  };

  const handleSubmit = async (payload) => {
    const body = {
      ...payload,
      start: payload.start.toISOString(),
      end: payload.end.toISOString(),
    };

    if (editing && editing._id) {
      await updateEvent.mutateAsync({
        id: editing._id,
        updates: body,
      });
    } else {
      await createEvent.mutateAsync(body);
    }

    closeModal();
  };

  const handleDelete = async () => {
    if (!editing || !editing._id) return;

    const yes = window.confirm(`Delete "${editing.title}"?`);
    if (!yes) return;

    await deleteEvent.mutateAsync(editing._id);
    closeModal();
  };

  const formatDateTimeRange = (start, end) => {
    if (!start) return "";

    const opts = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const startStr = start.toLocaleString(undefined, opts);
    const endStr = (end || start).toLocaleString(undefined, opts);

    return `${startStr} - ${endStr}`;
  };

  // Mouse hover on event
  const handleEventDidMount = (info) => {
    const title = info.event.title;
    const range = formatDateTimeRange(info.event.start, info.event.end);
    info.el.title = `${title}\n${range}`;
  };

  return (
    <div className="max-w-none mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl">
          ✨ Services Schedule ✨
        </h1>
        {isLoading && (
          <span className="text-xs text-gray-500 sm:text-sm">Loading…</span>
        )}
      </div>

      {/* Calendar wrapper */}
      <div className="rounded-2xl border border-gray-200 bg-white p-2 sm:p-3 md:p-4 shadow-sm overflow-x-auto">
        {/* min width so it doesn’t collapse too small on tiny screens */}
        <div className="min-w-[320px] sm:min-w-0">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={defaultView}
            height="auto"
            contentHeight="auto"
            expandRows
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable
            editable
            dayMaxEvents
            events={events.map((e) => ({
              id: e._id,
              title: e.title,
              start: e.start,
              end: e.end,
              allDay: e.allDay,
              backgroundColor: e.color,
              borderColor: e.color,
              extendedProps: e,
            }))}
            datesSet={onDatesSet}
            dateClick={onDateClick}
            eventClick={onEventClick}
            eventDrop={onEventDrop}
            eventResize={onEventResize}
            eventDidMount={handleEventDidMount}
          />
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Event" : "Create Event"}
      >
        {draft && (
          <EventForm
            initial={draft}
            mode={editing ? "edit" : "create"}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            onDelete={editing ? handleDelete : undefined}
          />
        )}
      </Modal>
    </div>
  );
}
