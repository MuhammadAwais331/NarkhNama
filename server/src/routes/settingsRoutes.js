import express from "express";

import {
    getSettings,
    updateSettings,
} from "../controllers/settingsController.js";

import {
    protect,
    admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Route
router.get("/", getSettings);

// Admin Route
router.put(
    "/",
    protect,
    admin,
    updateSettings
);

export default router;