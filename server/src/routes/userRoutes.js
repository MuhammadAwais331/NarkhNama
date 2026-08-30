import express from "express";

import {
    getUsers,
    deleteUser,
    toggleUserStatus,
} from "../controllers/userController.js";

import {
    protect,
    admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get(
    "/",
    protect,
    admin,
    getUsers
);

// Delete user
router.delete(
    "/:id",
    protect,
    admin,
    deleteUser
);

// Activate / Deactivate user
router.patch(
    "/:id/status",
    protect,
    admin,
    toggleUserStatus
);

export default router;