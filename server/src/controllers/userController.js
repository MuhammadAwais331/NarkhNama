import User from "../models/User.js";


// ==============================
// Get All Users
// ==============================
export const getUsers = async (req, res) => {

    try {

        const users = await User.find({})
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


// ==============================
// Delete User
// ==============================
export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found.",
            });

        }

        await user.deleteOne();

        res.status(200).json({
            message: "User deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


// ==============================
// Toggle User Status
// ==============================
export const toggleUserStatus = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found.",
            });

        }

        user.isActive = !user.isActive;

        await user.save();

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};