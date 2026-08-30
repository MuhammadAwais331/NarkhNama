import api from "./api";

// Get all announcements
export const getAnnouncements = async () => {
    const { data } = await api.get("/announcements");
    return data.announcements;
};

// Get one announcement
export const getAnnouncement = async (id) => {
    const { data } = await api.get(`/announcements/${id}`);
    return data.announcement;
};

// Create announcement
export const createAnnouncement = async (announcementData) => {
    const { data } = await api.post(
        "/announcements",
        announcementData
    );
    return data;
};

// Update announcement
export const updateAnnouncement = async (id, announcementData) => {
    const { data } = await api.put(
        `/announcements/${id}`,
        announcementData
    );
    return data;
};

// Delete announcement
export const deleteAnnouncement = async (id) => {
    const { data } = await api.delete(
        `/announcements/${id}`
    );
    return data;
};