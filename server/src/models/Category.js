import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        urdu: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },

        icon: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;