import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Settings from "../models/Settings.js";
import PriceHistory from "../models/PriceHistory.js";

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });


        const productsWithHistory = await Promise.all(

            products.map(async (product) => {

                const history = await PriceHistory.find({
                    product: product._id
                })
                    .sort({ date: 1 });


                return {
                    _id: product._id,
                    name: product.name,
                    urdu: product.urdu,
                    icon: product.icon,
                    // keep the populated category object
                    category: product.category,

                    unit: product.unit,
                    price: product.price,
                    status: product.status,

                    history,
                };

            })

        );


        res.status(200).json({

            success: true,
            data: productsWithHistory

        });


    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("category", "name");

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });

        }

        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const createProduct = async (req, res) => {

    try {

        const {
            name,
            urdu,
            icon,
            category,
            unit,
            price,
            status,
        } = req.body;

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {

            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });

        }

        const product = await Product.create({
            name,
            urdu,
            icon,
            category,
            unit,
            price,
            status,
        });

        await Settings.findOneAndUpdate(
            {},
            {
                lastUpdated: new Date(),
            }
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });

        }

        const categoryExists = await Category.findById(req.body.category);

        if (!categoryExists) {

            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });

        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (req.body.price) {

            await PriceHistory.create({
                product: product._id,
                price: req.body.price,
                date: new Date(),
            });

        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updatedProduct,
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

export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });

        }


        // Delete product
        await product.deleteOne();


        // Delete related price history
        await PriceHistory.deleteMany({
            product: req.params.id
        });


        // Update last updated date
        await Settings.findOneAndUpdate(
            {},
            {
                lastUpdated: new Date(),
            }
        );


        res.status(200).json({
            success: true,
            message: "Product and price history deleted successfully.",
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};