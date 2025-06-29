import express from "express";
import { dailyPanchang } from "../controllers/panchangController.js";

const router = express.Router();

// const {
//   passwordVerificationLimit,
//   emailVerificationLimit,
// } = require("../config/others");

//daily panchang
router.get("/panchang", dailyPanchang);

export default router;
