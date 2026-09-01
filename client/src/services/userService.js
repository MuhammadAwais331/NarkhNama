// import axios from "axios";
import api from "./api";
// const API_URL = "http://localhost:5000/api/users";

// const getToken = () => {
//     return localStorage.getItem("token");
// };

// const authConfig = () => ({
//     headers: {
//         Authorization: `Bearer ${getToken()}`,
//     },
// });

// Get all users
export const getUsers = async () => {
    const { data } = await api.get("/users");
    return data;
};

// Delete user
export const deleteUser = async (id) => {
    const { data } = await api.delete(
        `/users/${id}`,
        authConfig()
    );
    return data;
};

// Toggle Active / Inactive
export const toggleUserStatus = async (id) => {
    const { data } = await api.patch(
        `/users/${id}/toggle-status`,
        
    );

    return data;
};