import mongoose from "mongoose";


const priceHistorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    });


export default mongoose.model(
    "PriceHistory",
    priceHistorySchema
);