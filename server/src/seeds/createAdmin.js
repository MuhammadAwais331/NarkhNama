import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import connectDB from "../config/db.js";
import User from "../models/User.js";

const createAdmin = async () => {
    try {

        await connectDB();

        const adminExists = await User.findOne({
            email: "admin@narkhnama.com",
        });

        if (adminExists) {
            console.log("✅ Admin already exists.");
            process.exit();
        }

        await User.create({
            fullName: "Narkh Nama Admin",
            email: "admin@narkhnama.com",
            password: "Admin12345",
            role: "admin",
        });

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
};

createAdmin();