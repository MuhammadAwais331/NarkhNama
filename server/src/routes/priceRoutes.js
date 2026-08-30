import express from "express";

import {
    getProductHistory,
    getPriceTrends
}
    from "../controllers/priceController.js";


const router = express.Router();

// All products trends
router.get(
    "/history",
    getPriceTrends
);

router.get(
    "/product/:id",
    getProductHistory
);


export default router;