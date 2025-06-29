import express from "express";
import { scrollingAnnouncements } from "../controllers/eventsController.js";
const router = express.Router();

// router.get("/announcements", scrollingAnnouncements);
router.route("/announcements").get(scrollingAnnouncements);
// router.route("/announcements").post(addscrollingAnnouncements);
export default router;
