// /src/components/Calendar.jsx
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  useCreateEvent,
  useDeleteEvent,
  useEvents,
  useUpdateEvent,
} from "../api/events.js";
import {
  useCreateServicesQuery,
  useGetServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../features/slices/servicesCalendarApiSlice";

import { useSelector } from "react-redux";

export default function ServicesCalendar() {
  const calendarRef = useRef(null);
  const [range, setRange] = useState();
  //   const { data: events = [], isLoading } = useEvents(range);
  const [createServices, { createisLoading }, createerror] =
    useCreateServicesQuery();
  const [getServices, { getisLoading }, geterror] = useGetServicesQuery();
  const [updateService, { updateisLoading }, updateerror] =
    useUpdateServiceMutation();
  const [deleteService, { deleteisLoading }, deleteerror] =
    useDeleteServiceMutation();

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const defaultView = useSelector((s) => s.ui.defaultView);

  const onDatesSet = (arg) => {
    setRange({ start: arg.startStr, end: arg.endStr });
  };

  const onDateClick = async (arg) => {
    const title = window.prompt("Event title?");
    if (!title) return;
    try {
      const res = await createServices({
        title,
        start: arg.dateStr,
        end: arg.dateStr,
        allDay: true,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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

  const onEventClick = async (info) => {
    const id = info.event.extendedProps._id;
    const yes = window.confirm(`Delete "${info.event.title}"?`);
    if (yes) await deleteEvent.mutateAsync(id);
  };

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Calendar</h1>
        {isLoading && <span className="text-sm text-gray-500">Loading…</span>}
      </div>

      <div className="rounded-2xl border border-gray-200 p-3 shadow-sm bg-white">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={defaultView}
          height="auto"
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
            extendedProps: e, // keep _id for mutations
          }))}
          datesSet={onDatesSet}
          dateClick={onDateClick}
          eventDrop={onEventDrop}
          eventResize={onEventResize}
          eventClick={onEventClick}
        />
      </div>
    </div>
  );
}
