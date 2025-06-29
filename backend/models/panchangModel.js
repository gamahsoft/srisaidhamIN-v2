import mongoose from "mongoose";

const panchangSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: false,
    },
    sunrise: {
      type: String,
      required: false,
    },

    sunset: {
      type: String,
      required: false,
    },
    nakshathra: {
      type: String,
      required: false,
    },
    thithi: {
      type: String,
      required: false,
    },
    paksha: {
      type: String,
      required: false,
    },
    rahuKala: {
      type: String,
      required: false,
    },
    yamaKanda: {
      type: String,
      required: false,
    },
    auspiciousTime: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Panchang = mongoose.model("Panchang", panchangSchema);

export default Panchang;
