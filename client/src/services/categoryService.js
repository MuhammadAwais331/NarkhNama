import api from "./api";

// Get all categories
export const getCategories = async () => {

    const { data } = await api.get("/categories");

    return data.data;

};

// Create category
export const createCategory = async (categoryData) => {

    const { data } = await api.post(
        "/categories",
        categoryData
    );

    return data.data;

};

// Update category
export const updateCategory = async (
    id,
    categoryData
) => {

    const { data } = await api.put(
        `/categories/${id}`,
        categoryData
    );

    return data.data;

};

// Delete category
export const deleteCategory = async (id) => {

    const { data } = await api.delete(
        `/categories/${id}`
    );

    return data;

};