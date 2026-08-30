import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        urdu: {
            type: String,
            required: true,
            trim: true,
        },

        icon: {
            type: String,
            trim: true,
            default: "📦",
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        unit: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
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

export default mongoose.model("Product", productSchema);