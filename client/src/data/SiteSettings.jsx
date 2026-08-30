import axios from "axios";

const API_URL = "http://localhost:5000/api/settings";

// Get Website Settings
export const getSiteSettings = async () => {

  const { data } = await axios.get(API_URL);

  return data;

};

// Update Website Settings (Admin)
export const updateSiteSettings = async (settings) => {

  const token = localStorage.getItem("token");

  const { data } = await axios.put(
    API_URL,
    settings,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;

};