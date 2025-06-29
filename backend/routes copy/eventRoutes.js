import express from "express";
import { scrollingAnnouncements } from "../controllers/eventsController.js";
const router = express.Router();

router.get("/announcements", scrollingAnnouncements);

export default router;
