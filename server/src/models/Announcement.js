import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Announcement title is required."],
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            required: [true, "Announcement description is required."],
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Announcement category is required."],
            trim: true,
        },

        date: {
            type: String,
            required: [true, "Announcement date is required."],
        },

        featured: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Announcement",
    announcementSchema
);