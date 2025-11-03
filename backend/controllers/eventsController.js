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
    const { email, date, description } = req.body;
    const event = new Calendar({ email, date, description });
    await event.save();

    // // Send email
    // const content = "Hi Salam kenal";
    // await sendEmailHandler(email, content, content);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// @desc Delete calendar event
// @route DELETE /api/event/:id
// @access private/Admin
const deleteCalendarEvent = asyncHandler(async (req, res) => {
  const user = await Calendar.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get all events
// @route GET /api/events
// @access public
const getAllCalendarEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Calendar.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc UPDATE calendar events
// @route UPDATE /api/events
// @access private/Admin
const updateCalendarEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { email, date, description } = req.body;
    const updatedEvent = await Calendar.findByIdAndUpdate(
      id,
      { email, date, description },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export {
  scrollingAnnouncements,
  createCalendarEvent,
  deleteCalendarEvent,
  getAllCalendarEvents,
  updateCalendarEvent,
};
