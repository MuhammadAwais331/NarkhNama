import Announcement from "../models/Announcement.js";
import Settings from "../models/Settings.js";
/*
========================================
GET ALL ANNOUNCEMENTS
GET /api/announcements
========================================
*/
export const getAnnouncements = async (req, res) => {
    try {

        const announcements = await Announcement.find()
            .populate("createdBy", "fullName email")
            .sort({ featured: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: announcements.length,
            announcements,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


/*
========================================
GET SINGLE ANNOUNCEMENT
GET /api/announcements/:id
========================================
*/
export const getAnnouncement = async (req, res) => {

    try {

        const announcement = await Announcement.findById(req.params.id)
            .populate("createdBy", "fullName email");

        if (!announcement) {

            return res.status(404).json({
                success: false,
                message: "Announcement not found.",
            });

        }

        res.status(200).json({
            success: true,
            announcement,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


/*
========================================
CREATE ANNOUNCEMENT
POST /api/announcements
========================================
*/
export const createAnnouncement = async (req, res) => {

    try {

        const announcement = await Announcement.create({

            ...req.body,

            createdBy: req.user._id,

        });

        res.status(201).json({

            success: true,

            message: "Announcement created successfully.",

            announcement,

        });

        await Settings.findOneAndUpdate(
            {},
            {
                lastUpdated: new Date(),
            }
        );

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


/*
========================================
UPDATE ANNOUNCEMENT
PUT /api/announcements/:id
========================================
*/
export const updateAnnouncement = async (req, res) => {

    try {

        const announcement = await Announcement.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true,
            }

        );

        if (!announcement) {

            return res.status(404).json({

                success: false,

                message: "Announcement not found.",

            });

        }

        res.status(200).json({

            success: true,

            message: "Announcement updated successfully.",

            announcement,

        });

        await Settings.findOneAndUpdate(
            {},
            {
                lastUpdated: new Date(),
            }
        );

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


/*
========================================
DELETE ANNOUNCEMENT
DELETE /api/announcements/:id
========================================
*/
export const deleteAnnouncement = async (req, res) => {

    try {

        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {

            return res.status(404).json({

                success: false,

                message: "Announcement not found.",

            });

        }

        await announcement.deleteOne();

        res.status(200).json({

            success: true,

            message: "Announcement deleted successfully.",

        });

        await Settings.findOneAndUpdate(
            {},
            {
                lastUpdated: new Date(),
            }
        );

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};