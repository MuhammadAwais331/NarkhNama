import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        siteName: {
            type: String,
            default: "Narkh Nama",
            trim: true,
        },

        lastUpdated: {
            type: Date,
            default: Date.now,
        },

        verified: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Settings = mongoose.model(
    "Settings",
    settingsSchema
);

export default Settings;