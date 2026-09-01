import api from "../services/api";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/settings";

// // Get Website Settings
// export const getSiteSettings = async () => {

//   const { data } = await axios.get(API_URL);

//   return data;

// };

// // Update Website Settings (Admin)
// export const updateSiteSettings = async (settings) => {

//   const token = localStorage.getItem("token");

//   const { data } = await axios.put(
//     API_URL,
//     settings,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return data;

// };

export const getSiteSettings = async () => {
    const { data } = await api.get("/settings");
    return data;
};

export const updateSiteSettings = async (settings) => {
    const { data } = await api.put("/settings", settings);
    return data;
};