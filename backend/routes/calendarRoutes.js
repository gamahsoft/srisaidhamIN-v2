import express from "express";
import {
  // dailyPanchang,
  createCalendarEvent,
  deleteCalendarEvent,
  getAllCalendarEvents,
  updateCalendarEvent,
} from "../controllers/eventsController.js";
import { dailyPanchang } from "../controllers/panchangController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// const {
//   passwordVerificationLimit,
//   emailVerificationLimit,
// } = require("../config/others");

//daily panchang
router.get("/panchang", dailyPanchang);

//Schedule Calendar events
router.route("/add-event").post(protect, admin, createCalendarEvent);
router.get("/all-events", getAllCalendarEvents);
router.route("/update-event/:id").patch(protect, admin, updateCalendarEvent);
router.route("/delete-event/:id").delete(protect, admin, deleteCalendarEvent);

export default router;
