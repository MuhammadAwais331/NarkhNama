import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getToken = () => {
    return localStorage.getItem("token");
};

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

// Get all users
export const getUsers = async () => {
    const { data } = await axios.get(API_URL, authConfig());
    return data;
};

// Delete user
export const deleteUser = async (id) => {
    const { data } = await axios.delete(
        `${API_URL}/${id}`,
        authConfig()
    );
    return data;
};

// Toggle Active / Inactive
export const toggleUserStatus = async (id) => {
    const { data } = await axios.patch(
        `${API_URL}/${id}/toggle-status`,
        {},
        authConfig()
    );

    return data;
};