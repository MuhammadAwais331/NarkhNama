import express from "express";
import { login, register } from "../controllers/authController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get(
    "/profile",
    protect,
    admin,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin!",
            user: req.user,
        });
    }
);

export default router;