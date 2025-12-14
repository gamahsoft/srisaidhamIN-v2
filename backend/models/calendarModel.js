// models/Event.js
import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      // default: "#3b82f6", // blue
      default: "#F7963B", // orange
    },
    // optional: link to user if you have auth
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
