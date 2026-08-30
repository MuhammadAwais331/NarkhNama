import Settings from "../models/Settings.js";

// Get Website Settings
export const getSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne();

        // Create default settings if none exist
        if (!settings) {

            settings = await Settings.create({
                siteName: "Narkh Nama",
                verified: true,
            });

        }

        res.status(200).json(settings);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Update Website Settings
export const updateSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne();

        if (!settings) {

            settings = await Settings.create(req.body);

        } else {

            settings = await Settings.findByIdAndUpdate(
                settings._id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        }

        res.status(200).json({
            success: true,
            message: "Settings updated successfully.",
            settings,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};