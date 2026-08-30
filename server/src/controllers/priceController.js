import PriceHistory from "../models/PriceHistory.js";
import Product from "../models/Product.js";


export const getProductHistory = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("category", "name");


        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        const history = await PriceHistory.find({
            product: req.params.id
        })
            .sort({ date: 1 });


        res.status(200).json({

            success: true,

            data: {

                _id: product._id,

                name: product.name,

                urdu: product.urdu,

                category: product.category.name,

                unit: product.unit,

                history: history.map(item => ({

                    date: item.date
                        .toISOString()
                        .split("T")[0],

                    price: item.price

                }))

            }

        });


    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// GET ALL PRODUCTS PRICE TRENDS
export const getPriceTrends = async (req, res) => {

    try {

        const products = await Product.find()
            .populate("category", "name");


        const data = await Promise.all(

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

                    category: product.category.name,

                    unit: product.unit,

                    price: product.price,   // ADD THIS

                    history: history.map(item => ({

                        date: item.date
                            .toISOString()
                            .split("T")[0],

                        price: item.price

                    }))

                };


            })

        );


        res.status(200).json({

            success: true,

            data

        });


    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};