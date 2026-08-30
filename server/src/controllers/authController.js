import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Login Admin
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password."
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password."
            });
        }

        // Update last login
        user.lastLogin = new Date();

        await user.save();

        // Generate Token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Register User
export const register = async (req, res) => {
    try {

        const {
            fullName,
            email,
            phone,
            password,
        } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists.",
            });
        }

        const user = await User.create({
            fullName,
            email,
            phone,
            password,
        });

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};