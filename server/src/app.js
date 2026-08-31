import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

const app = express();

app.use(
    cors({
        origin: "https://narkh-nama-git-main-muhammad-awais2.vercel.app",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/prices",priceRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Narkh Nama Server is Running...",
    });
});

export default app;