import express from "express";

import {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from "../controllers/announcementController.js";

import {
    protect,
    admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
========================================
Public Routes
========================================
*/

// Get all announcements
router.get("/", getAnnouncements);

// Get single announcement
router.get("/:id", getAnnouncement);

/*
========================================
Admin Routes
========================================
*/

// Create announcement
router.post(
    "/",
    protect,
    admin,
    createAnnouncement
);

// Update announcement
router.put(
    "/:id",
    protect,
    admin,
    updateAnnouncement
);

// Delete announcement
router.delete(
    "/:id",
    protect,
    admin,
    deleteAnnouncement
);

export default router;