import asyncHandler from "../middleware/asyncHandler.js";
import Announcement from "../models/announcementModel.js";
import Calendar from "../models/calendarModel.js";

// @route POST /api/event/announcements
// @access Public
const addscrollingAnnouncements = asyncHandler(async (req, res) => {
  const newAnnouncement = new Announcement({
    date: "2025-6-26",
    announcement1: "SSP Backpack Drive 2022 (June 1st - July 31st)",
    announcement2:
      "SSP Guru Poornima Celebrations 2022 - (July 10TH & July 12th)",
    announcement3: "SSP Backpack Drive 2022 (June 1st - July 31st)",
    announcement4:
      "SSP Guru Poornima Celebrations 2022 - (July 10TH & July 12th)",
  });

  const createdAnnouncement = await newAnnouncement.save();

  res.status(201).json(createdAnnouncement);
});

// @route GET /api/event/announcements
// @access Public
const scrollingAnnouncements = asyncHandler(async (req, res) => {
  const scrollingEvents = await Announcement.findOne({});

  if (scrollingEvents) {
    res.send({
      date: scrollingEvents.date,
      announcement1: scrollingEvents.announcement1,
      announcement2: scrollingEvents.announcement2,
      announcement3: scrollingEvents.announcement3,
      announcement4: scrollingEvents.announcement4,
    });
  } else {
    res.status(404);
    throw new Error("scrollingEvents");
  }
});

// @desc add calendar event
// @route POST /api/event/:id
// @access private/Admin
const createCalendarEvent = asyncHandler(async (req, res) => {
  try {
    const { title, start, end, allDay, color, notes } = req.body;

    if (!title || !start || !end) {
      return res
        .status(400)
        .json({ message: "title, start and end are required" });
    }

    const newEvent = await Calendar.create({
      title,
      start,
      end,
      allDay: !!allDay,
      color,
      notes,
      // ownerId: req.user._id  // if you have auth
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("POST /api/events error:", err);
    res.status(500).json({ message: err.message });

    // res.status(500).json({ message: "Server error creating event" });
  }
});
// @desc Delete calendar event
// @route DELETE /api/event/:id
// @access private/Admin
const deleteCalendarEvent = asyncHandler(async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /api/events/:id error:", err);
    // res.status(500).json({ message: "Server error deleting event" });
    res.status(500).json({ message: err.message });
  }
});

// @desc get all events
// @route GET /api/events
// @access public
const getAllCalendarEvents = asyncHandler(async (req, res) => {
  try {
    // const events = await Calendar.find();
    // res.json(events);
    const { start, end } = req.query;
    let query = {};

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      // Events that intersect [startDate, endDate]
      query = {
        $or: [
          // starts in range
          { start: { $gte: startDate, $lt: endDate } },
          // ends in range
          { end: { $gt: startDate, $lte: endDate } },
          // spans entire range
          {
            start: { $lte: startDate },
            end: { $gte: endDate },
          },
        ],
      };
    }
    const events = await Calendar.find(query).sort({ start: 1 }).lean();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("GET /api/events error:", err);
    // res.status(500).json({ message: "Server error loading events" });
  }
});

// @desc UPDATE calendar events
// @route UPDATE /api/events
// @access private/Admin
const updateCalendarEvent = asyncHandler(async (req, res) => {
  // console.log("I am in updateCalendarEvent", req.body);
  try {
    const updates = req.body;

    const updated = await Calendar.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("PUT /api/events/:id error:", err);
    res.status(500).json({ message: err.message });

    // res.status(500).json({ message: "Server error updating event" });
  }
});

export {
  addscrollingAnnouncements,
  scrollingAnnouncements,
  createCalendarEvent,
  deleteCalendarEvent,
  getAllCalendarEvents,
  updateCalendarEvent,
};
