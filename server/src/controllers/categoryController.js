import Category from "../models/Category.js";
import slugify from "slugify";
// Get All Categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Category
export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Create Category
export const createCategory = async (req, res) => {

    try {

        const {
            name,
            urdu,
            icon,
            status,
        } = req.body;

        // Validation
        if (!name || !urdu || !icon) {

            return res.status(400).json({
                success: false,
                message: "Name, Urdu name and icon are required.",
            });

        }

        // Check duplicate name
        const existingCategory = await Category.findOne({
            name: name.trim(),
        });

        if (existingCategory) {

            return res.status(400).json({
                success: false,
                message: "Category already exists.",
            });

        }

        // Generate slug automatically
        const slug = slugify(name, {
            lower: true,
            strict: true,
        });

        const category = await Category.create({

            name: name.trim(),

            urdu: urdu.trim(),

            slug,

            icon: icon.trim(),

            status,

        });

        res.status(201).json({

            success: true,

            message: "Category created successfully.",

            data: category,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Update Category

export const updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            urdu,
            icon,
            status,
        } = req.body;

        // Find category
        const category = await Category.findById(id);

        if (!category) {

            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });

        }

        // Check duplicate name
        if (name && name.trim() !== category.name) {

            const existingCategory = await Category.findOne({
                name: name.trim(),
            });

            if (existingCategory) {

                return res.status(400).json({
                    success: false,
                    message: "Category name already exists.",
                });

            }

            category.name = name.trim();

            category.slug = slugify(name, {
                lower: true,
                strict: true,
            });

        }

        if (urdu) {
            category.urdu = urdu.trim();
        }

        if (icon) {
            category.icon = icon.trim();
        }

        if (status) {
            category.status = status;
        }

        await category.save();

        res.status(200).json({

            success: true,

            message: "Category updated successfully.",

            data: category,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
// Delete Category
export const deleteCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });

        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};