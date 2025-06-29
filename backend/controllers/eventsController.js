import asyncHandler from "../middleware/asyncHandler.js";
import Announcement from "../models/announcementModel.js";

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

export { scrollingAnnouncements };
