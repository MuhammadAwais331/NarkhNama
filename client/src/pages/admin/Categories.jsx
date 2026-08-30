import { useEffect, useState } from "react"; import toast from "react-hot-toast";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTags,
    FaTimes,
} from "react-icons/fa";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);

    const [deletingCategory, setDeletingCategory] = useState(null);

    const [categoryForm, setCategoryForm] = useState({
        name: "",
        urdu: "",
        icon: "",
        status: "Active",
    });

    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load categories."
            );

        }

    };
    useEffect(() => {

        fetchCategories();

    }, []);

    const openAddCategoryModal = () => {

        setEditingCategory(null);

        setCategoryForm({
            name: "",
            urdu: "",
            icon: "",
            status: "Active",
        });

        setShowCategoryModal(true);

    };

    const closeCategoryModal = () => {

        setShowCategoryModal(false);

        setEditingCategory(null);

        setCategoryForm({
            name: "",
            urdu: "",
            icon: "",
            status: "Active",
        });

    };

    const handleCategoryChange = (e) => {

        setCategoryForm({
            ...categoryForm,
            [e.target.name]: e.target.value,
        });

    };

    const handleEditCategory = (category) => {

        setEditingCategory(category);

        setCategoryForm({
            name: category.name,
            urdu: category.urdu,
            icon: category.icon,
            status: category.status,
        });

        setShowCategoryModal(true);

    };

    const handleCategorySubmit = async (e) => {

        e.preventDefault();

        if (!categoryForm.name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        if (!categoryForm.urdu.trim()) {
            toast.error("Urdu name is required.");
            return;
        }

        if (!categoryForm.icon.trim()) {
            toast.error("Category icon is required.");
            return;
        }

        if (!categoryForm.status) {
            toast.error("Please select a status.");
            return;
        }

        try {

            if (editingCategory) {

                await updateCategory(
                    editingCategory._id,
                    categoryForm
                );

                toast.success("Category updated successfully.");

            } else {

                await createCategory(categoryForm);

                toast.success("Category added successfully.");

            }

            fetchCategories();

            closeCategoryModal();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    const handleDeleteCategory = async () => {

        if (!deletingCategory) return;

        try {

            await deleteCategory(deletingCategory._id);

            toast.success("Category deleted successfully.");

            fetchCategories();

            setDeletingCategory(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete category."
            );

        }

    };

    const filteredCategories = categories.filter((category) => {

        const value = search.toLowerCase().trim();

        return (

            category.name.toLowerCase().includes(value) ||

            category.urdu.includes(value)

        );

    });

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">

                        Categories

                    </h1>

                    <p className="mt-1 text-sm text-gray-500">

                        Manage all product categories.

                    </p>

                </div>

                <button
                    type="button"
                    onClick={openAddCategoryModal}
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

                    Add Category

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
                        placeholder="Search category..."
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
                            transition
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

                        <h2 className="font-bold text-gray-800">

                            Categories List

                        </h2>

                        <p className="mt-1 text-xs text-gray-500">

                            {filteredCategories.length} categories

                        </p>

                    </div>

                    <FaTags className="text-xl text-green-600" />

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">

                                    Category

                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">

                                    Urdu

                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">

                                    Products

                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">

                                    Status

                                </th>

                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-gray-500">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredCategories.map((category) => (

                                <tr
                                    key={category._id}
                                    className="hover:bg-gray-50"
                                >

                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <span className="text-2xl">

                                                {category.icon}

                                            </span>

                                            <span className="font-semibold text-gray-800">

                                                {category.name}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-5 py-4">

                                        {category.urdu}

                                    </td>

                                    <td className="px-5 py-4">

                                        {category.products}

                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className="
                                                rounded-full
                                                bg-green-50
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                text-green-700
                                            "
                                        >

                                            {category.status}

                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-end gap-2">

                                            <button
                                                type="button"
                                                onClick={() => handleEditCategory(category)}
                                                className="
                                                    rounded-lg
                                                    p-2
                                                    text-blue-600
                                                    transition
                                                    hover:bg-blue-50
                                                    cursor-pointer
                                                "
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setDeletingCategory(category)}
                                                className="
                                                    rounded-lg
                                                    p-2
                                                    text-red-600
                                                    transition
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

                {filteredCategories.length === 0 && (

                    <div className="p-10 text-center">

                        <FaTags className="mx-auto text-3xl text-gray-300" />

                        <p className="mt-3 font-semibold text-gray-600">

                            No categories found.

                        </p>

                    </div>

                )}

            </section>
            {/* Add / Edit Category Modal */}

            {showCategoryModal && (

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
                max-w-lg
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

                                    {editingCategory
                                        ? "Edit Category"
                                        : "Add Category"}

                                </h2>

                                <p className="mt-1 text-xs text-gray-500">

                                    {editingCategory
                                        ? "Update category information."
                                        : "Create a new category."}

                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeCategoryModal}
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
                            onSubmit={handleCategorySubmit}
                            className="space-y-5 p-5"
                        >

                            {/* English Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Category Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={categoryForm.name}
                                    onChange={handleCategoryChange}
                                    placeholder="Vegetables"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Urdu */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Urdu Name

                                </label>

                                <input
                                    type="text"
                                    dir="rtl"
                                    name="urdu"
                                    value={categoryForm.urdu}
                                    onChange={handleCategoryChange}
                                    placeholder="سبزیاں"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-right
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Icon */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Icon / Emoji

                                </label>

                                <input
                                    type="text"
                                    name="icon"
                                    value={categoryForm.icon}
                                    onChange={handleCategoryChange}
                                    placeholder="🥦"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Status */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Status

                                </label>

                                <select
                                    name="status"
                                    value={categoryForm.status}
                                    onChange={handleCategoryChange}
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>

                            {/* Buttons */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeCategoryModal}
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
                            active:scale-95
                        "
                                >

                                    {editingCategory
                                        ? "Save Changes"
                                        : "Add Category"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}
            {deletingCategory && (

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

                        <div
                            className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-600
                "
                        >

                            <FaTrash size={22} />

                        </div>

                        <div className="mt-5 text-center">

                            <h2 className="text-xl font-bold text-gray-800">

                                Delete Category?

                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">

                                Are you sure you want to delete

                                <span className="font-semibold text-gray-700">
                                    {" "}{deletingCategory.name}
                                </span>

                                ?

                                <br />

                                This action cannot be undone.

                            </p>

                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">

                            <button
                                type="button"
                                onClick={() => setDeletingCategory(null)}
                                className="
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-gray-700
                        hover:bg-gray-50
                    "
                            >

                                Cancel

                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteCategory}
                                className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-red-700
                    "
                            >

                                Delete Category

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Categories;