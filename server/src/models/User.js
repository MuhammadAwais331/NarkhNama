import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

});

// Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};

const User = mongoose.model("User", userSchema);

export default User;