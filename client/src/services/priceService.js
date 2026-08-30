import api from "./api";


// Get all product price trends
export const getPriceTrends = async () => {

    const { data } = await api.get("/prices/history");

    return data.data;

};


// Get single product history
export const getProductHistory = async (id) => {

    const { data } = await api.get(
        `/prices/product/${id}`
    );

    return data.data;

};