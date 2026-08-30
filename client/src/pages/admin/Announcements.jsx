import { useEffect, useState } from "react";

import {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from "../../services/announcementService";;
import toast from "react-hot-toast";

import {
    FaBullhorn,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTimes,
} from "react-icons/fa";

function Announcements() {

    const [search, setSearch] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);

    const [announcementForm, setAnnouncementForm] = useState({
        title: "",
        description: "",
        category: "",
        date: "",
        featured: false,
    });

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        try {
            const data = await getAnnouncements();
            setAnnouncements(data);
        } catch (error) {
            toast.error("Failed to load announcements.");
        }
    };

    const filteredAnnouncements = announcements.filter((item) => {

        const value = search.toLowerCase().trim();

        return (

            item.title.toLowerCase().includes(value) ||

            item.category.toLowerCase().includes(value)

        );

    });

    const openAddAnnouncementModal = () => {

        setEditingAnnouncement(null);

        setAnnouncementForm({
            title: "",
            description: "",
            category: "",
            date: "",
            featured: false,
        });

        setShowAnnouncementModal(true);

    };

    const closeAnnouncementModal = () => {

        setShowAnnouncementModal(false);

        setEditingAnnouncement(null);

    };

    const handleAnnouncementChange = (e) => {

        const { name, value, type, checked } = e.target;

        setAnnouncementForm({
            ...announcementForm,
            [name]: type === "checkbox" ? checked : value,
        });

    };

    const handleEditAnnouncement = (announcement) => {

        setEditingAnnouncement(announcement);

        setAnnouncementForm({
            title: announcement.title || "",
            description: announcement.description || "",
            category: announcement.category || "",
            date: announcement.date || "",
            featured: announcement.featured ?? false,
        });

        setShowAnnouncementModal(true);

    };

    const handleAnnouncementSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingAnnouncement) {
                1
                await updateAnnouncement(
                    editingAnnouncement._id,
                    announcementForm
                );

                toast.success("Announcement updated successfully.");

            } else {

                await createAnnouncement(announcementForm);

                toast.success("Announcement added successfully.");

            }

            await loadAnnouncements();

            closeAnnouncementModal();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    const handleDeleteAnnouncement = async () => {

        if (!deletingAnnouncement) return;

        try {

            await deleteAnnouncement(deletingAnnouncement._id);

            toast.success("Announcement deleted successfully.");

            setDeletingAnnouncement(null);

            loadAnnouncements();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete announcement."
            );

        }

    };

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Announcements
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create and manage public announcements.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={openAddAnnouncementModal}
                    className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-green-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        cursor-pointer
                        transition
                        hover:bg-green-700
                        active:scale-95
                        sm:w-auto
                    "
                >

                    <FaPlus />

                    Add Announcement

                </button>

            </div>

            {/* Search */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="relative">

                    <FaSearch
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input
                        type="search"
                        placeholder="Search announcement..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            py-3
                            pl-11
                            pr-4
                            outline-none
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                    />

                </div>

            </div>

            {/* Table */}

            <section
                className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                "
            >

                <div className="flex items-center justify-between border-b border-gray-200 p-5">

                    <div>

                        <h2 className="font-bold">
                            Announcement List
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            {filteredAnnouncements.length} announcements
                        </p>

                    </div>

                    <FaBullhorn className="text-green-600 text-xl" />

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Title
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Featured
                                </th>

                                <th className="px-5 py-4 text-right text-xs uppercase">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredAnnouncements.map((item) => (

                                <tr
                                    key={item._id}
                                    className="hover:bg-gray-50"
                                >

                                    <td className="px-5 py-4">

                                        <p className="font-semibold">
                                            {item.title}
                                        </p>

                                    </td>

                                    <td className="px-5 py-4">
                                        {item.category}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.date}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold

                                                ${item.featured
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }
                                            `}
                                        >

                                            {item.featured
                                                ? "Yes"
                                                : "No"
                                            }

                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-end gap-2">

                                            <button
                                                onClick={() => handleEditAnnouncement(item)}
                                                className="
                                                    rounded-lg
                                                    p-2
                                                    text-blue-600
                                                    hover:bg-blue-50
                                                    cursor-pointer
                                                "
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                onClick={() => setDeletingAnnouncement(item)}
                                                className="
                                                    rounded-lg
                                                    p-2
                                                    text-red-600
                                                    hover:bg-red-50
                                                    cursor-pointer
                                                "
                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>
            {/* Add / Edit Announcement Modal */}

            {showAnnouncementModal && (

                <div
                    className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
        "
                >

                    <div
                        className="
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
            "
                    >

                        {/* Header */}

                        <div
                            className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    px-5
                    py-4
                "
                        >

                            <div>

                                <h2 className="text-lg font-bold text-gray-800">

                                    {editingAnnouncement
                                        ? "Edit Announcement"
                                        : "Add Announcement"}

                                </h2>

                                <p className="mt-1 text-xs text-gray-500">

                                    {editingAnnouncement
                                        ? "Update announcement information."
                                        : "Create a new public announcement."}

                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeAnnouncementModal}
                                className="
                        rounded-lg
                        p-2
                        text-gray-500
                        transition
                        hover:bg-gray-100
                    "
                            >

                                <FaTimes />

                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleAnnouncementSubmit}
                            className="space-y-5 p-5"
                        >

                            {/* Title */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Title

                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={announcementForm.title || ""}
                                    onChange={handleAnnouncementChange}
                                    placeholder="Official Vegetable Prices Updated"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Description */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Description

                                </label>

                                <textarea
                                    rows={5}
                                    name="description"
                                    value={announcementForm.description || ""}
                                    onChange={handleAnnouncementChange}
                                    placeholder="Write announcement details..."
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            resize-none
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Category + Date */}

                            <div className="grid grid-cols-2 gap-4">

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={announcementForm.category || ""}
                                        onChange={handleAnnouncementChange}
                                        className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            focus:border-green-600
            focus:ring-2
            focus:ring-green-100
            bg-white
        "
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        <option value="Price Update">
                                            Price Update
                                        </option>

                                        <option value="Inspection">
                                            Inspection
                                        </option>

                                        <option value="Weather">
                                            Weather
                                        </option>

                                        <option value="Supply Update">
                                            Supply Update
                                        </option>

                                        <option value="Holiday">
                                            Holiday
                                        </option>

                                        <option value="Public Notice">
                                            Public Notice
                                        </option>

                                    </select>

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Date

                                    </label>

                                    <input
                                        type="text"
                                        name="date"
                                        value={announcementForm.date || ""}
                                        onChange={handleAnnouncementChange}
                                        placeholder="09 Aug 2026"
                                        className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                focus:border-green-600
                                focus:ring-2
                                focus:ring-green-100
                            "
                                    />

                                </div>

                            </div>

                            {/* Featured */}

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={announcementForm.featured}
                                    onChange={handleAnnouncementChange}
                                    className="h-4 w-4"
                                />

                                <span className="text-sm font-medium text-gray-700">

                                    Featured Announcement

                                </span>

                            </label>

                            {/* Buttons */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeAnnouncementModal}
                                    className="
                            rounded-xl
                            border
                            border-gray-300
                            px-5
                            py-3
                            font-semibold
                            text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                                >

                                    Cancel

                                </button>

                                <button
                                    type="submit"
                                    className="
                            rounded-xl
                            bg-green-600
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                        "
                                >

                                    {editingAnnouncement
                                        ? "Save Changes"
                                        : "Add Announcement"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* Delete Confirmation Modal */}

            {deletingAnnouncement && (

                <div
                    className="
            fixed
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
        "
                >

                    <div
                        className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
            "
                    >

                        <div className="flex items-start gap-4">

                            <div
                                className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                        text-red-600
                    "
                            >

                                <FaTrash />

                            </div>

                            <div className="flex-1">

                                <h3 className="text-lg font-bold text-gray-800">

                                    Delete Announcement

                                </h3>

                                <p className="mt-2 text-sm text-gray-500">

                                    Are you sure you want to delete

                                    <span className="font-semibold text-gray-700">

                                        {" "}{deletingAnnouncement.title}

                                    </span>

                                    ?

                                </p>

                                <p className="mt-2 text-sm text-red-600">

                                    This action cannot be undone.

                                </p>

                            </div>

                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() => setDeletingAnnouncement(null)}
                                className="
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-3
                        font-semibold
                        text-gray-700
                        transition
                        hover:bg-gray-50
                    "
                            >

                                Cancel

                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteAnnouncement}
                                className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                    "
                            >

                                Delete Announcement

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Announcements;