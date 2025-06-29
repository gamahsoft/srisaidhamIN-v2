import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    announcement1: {
      type: String,
      required: false,
    },
    announcement2: {
      type: String,
      required: false,
    },
    announcement3: {
      type: String,
      required: false,
    },
    announcement4: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
