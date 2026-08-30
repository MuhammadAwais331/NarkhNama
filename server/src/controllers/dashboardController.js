import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Announcement from "../models/Announcement.js";
import User from "../models/User.js";
import SiteSetting from "../models/SiteSetting.js";

export const getDashboardData = async (req, res) => {
    try {

        const [
            totalProducts,
            totalCategories,
            totalAnnouncements,
            totalUsers,
            siteSettings,
        ] = await Promise.all([
            Product.countDocuments(),
            Category.countDocuments(),
            Announcement.countDocuments(),
            User.countDocuments(),
            SiteSetting.findOne(),
        ]);

        // Latest updated products
        const recentProducts = await Product.find()
            .sort({ updatedAt: -1 })
            .limit(5)
            .populate("category", "name");

        const recentPrices = recentProducts.map((product) => ({
            product: product.name,
            category: product.category?.name || "-",
            price: product.currentPrice,
            updatedAt: product.updatedAt,
        }));

        res.status(200).json({
            success: true,

            stats: {
                products: totalProducts,
                categories: totalCategories,
                announcements: totalAnnouncements,
                users: totalUsers,
            },

            recentPrices,

            lastUpdated: siteSettings?.lastUpdated || null,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};