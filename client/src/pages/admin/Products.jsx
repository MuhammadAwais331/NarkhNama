import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaBoxOpen,
    FaTimes,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";

import {
    getCategories,
} from "../../services/categoryService";

function Products() {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const handleEditProduct = (product) => {

        setEditingProduct(product);

        setNewProduct({
            name: product.name,
            urdu: product.urdu,
            icon: product.icon,
            category: product.category,
            unit: product.unit,
            price: product.price,
        });

        setShowAddProduct(true);

    };

    const [newProduct, setNewProduct] = useState({
        name: "",
        urdu: "",
        icon: "",
        category: "",
        unit: "",
        price: "",
    });
    const openAddProductModal = () => {

        setEditingProduct(null);

        setNewProduct({
            name: "",
            urdu: "",
            icon: "",
            category: "",
            unit: "",
            price: "",
        });

        setShowAddProduct(true);

    };
    const handleProductChange = (e) => {

        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });

    };

    const fetchProducts = async () => {
        try {
            const response = await getProducts();

            setProducts(
                response.data?.data ||
                response.data?.products ||
                response.data ||
                []
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load products."
            );

            setProducts([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const categoriesData = await getCategories();

            setCategories(Array.isArray(categoriesData) ? categoriesData : []);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load categories."
            );

            setCategories([]);
        }
    };

    useEffect(() => {

        fetchProducts();

        fetchCategories();

    }, []);

    const handleDeleteProduct = async () => {

        if (!deletingProduct) return;

        try {

            await deleteProduct(deletingProduct._id);

            toast.success("Product deleted successfully.");

            fetchProducts();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete product."
            );

        }

        setDeletingProduct(null);

    };

    const handleAddProduct = async (e) => {

        e.preventDefault();

        if (!newProduct.name.trim()) {
            toast.error("Product name is required.");

            return;
        }

        if (!newProduct.urdu.trim()) {
            toast.error("Urdu name is required.");

            return;
        }

        if (!newProduct.icon.trim()) {
            toast.error("icon is required.");

            return;
        }

        if (!newProduct.category) {
            toast.error("Please select a category.");

            return;
        }

        if (!newProduct.unit) {
            toast.error("Please select a unit.");

            return;
        }

        if (
            newProduct.price === "" ||
            Number(newProduct.price) <= 0
        ) {
            toast.error("Price must be greater than zero.");
            return;
        }

        try {

            if (editingProduct) {

                await updateProduct(
                    editingProduct._id,
                    newProduct
                );

                toast.success("Product updated successfully.");

            } else {

                await createProduct(newProduct);

                toast.success("Product added successfully.");

            }

            fetchProducts();

            setNewProduct({
                name: "",
                urdu: "",
                icon: "",
                category: "",
                unit: "",
                price: "",
            });

            setEditingProduct(null);

            setShowAddProduct(false);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }
    };

    const [search, setSearch] = useState("");

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const filteredProducts = Array.isArray(products)
        ? products.filter((product) => {
            const searchValue = search.toLowerCase().trim();

            return (
                product.name?.toLowerCase().includes(searchValue) ||
                product.urdu?.includes(searchValue) ||
                product.category?.name?.toLowerCase().includes(searchValue)
            );
        })
        : [];

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Products
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage products available in Narkh Nama.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={openAddProductModal}
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

                    Add Product

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product or category..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            py-3
                            pl-11
                            pr-4
                            text-sm
                            text-gray-800
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                    />

                </div>

            </div>

            {/* Products */}

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

                {/* Section Header */}

                <div className="flex items-center justify-between border-b border-gray-200 p-5">

                    <div>

                        <h2 className="font-bold text-gray-800">
                            Product List
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            {filteredProducts.length} products found
                        </p>

                    </div>

                    <FaBoxOpen className="text-xl text-green-600" />

                </div>

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[750px] text-left">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Product
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Unit
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Current Price
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredProducts.map((product) => (

                                <tr
                                    key={product._id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* Product */}

                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">
                                                {product.icon || "📦"}
                                            </span>

                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {product.name}
                                                </p>

                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    {product.urdu}
                                                </p>
                                            </div>
                                        </div>

                                    </td>

                                    {/* Category */}

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {product.category?.name || "—"}
                                    </td>

                                    {/* Unit */}

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {product.unit}
                                    </td>

                                    {/* Price */}

                                    <td className="px-5 py-4">

                                        <span className="text-sm font-semibold text-gray-800">
                                            Rs {product.price}
                                        </span>

                                        <span className="ml-1 text-xs text-gray-500">
                                            / {product.unit}
                                        </span>

                                    </td>

                                    {/* Status */}

                                    <td className="px-5 py-4">

                                        <span
                                            className="
                                                inline-flex
                                                rounded-full
                                                bg-green-50
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                text-green-700
                                            "
                                        >
                                            {product.status}
                                        </span>

                                    </td>

                                    {/* Actions */}

                                    <td className="px-5 py-4">

                                        <div className="flex justify-end gap-2">

                                            <button
                                                type="button"
                                                onClick={() => handleEditProduct(product)}
                                                aria-label={`Edit ${product.name}`}
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
                                                onClick={() => setDeletingProduct(product)}
                                                aria-label={`Delete ${product.name}`}
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

                {/* Empty State */}

                {filteredProducts.length === 0 && (

                    <div className="p-10 text-center">

                        <FaBoxOpen className="mx-auto text-3xl text-gray-300" />

                        <p className="mt-3 font-semibold text-gray-600">
                            No products found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Try a different search term.
                        </p>

                    </div>

                )}

            </section>
            {showAddProduct && (

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

                        {/* Modal Header */}

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
                                    {editingProduct ? "Edit Product" : "Add Product"}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    {editingProduct
                                        ? "Update product information."
                                        : "Add a new product to Narkh Nama."
                                    }
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() => setShowAddProduct(false)}
                                aria-label="Close modal"
                                className="
                        rounded-lg
                        p-2
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-800
                    "
                            >

                                <FaTimes />

                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleAddProduct}
                            className="space-y-5 p-5"
                        >

                            {/* Product Name */}

                            <div>

                                <label
                                    htmlFor="product-name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Name
                                </label>

                                <input
                                    id="product-name"
                                    name="name"
                                    type="text"
                                    value={newProduct.name}
                                    onChange={handleProductChange}
                                    placeholder="e.g. Tomato"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            {/* Urdu Name */}

                            <div>

                                <label
                                    htmlFor="product-urdu"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Urdu Name
                                </label>

                                <input
                                    id="product-urdu"
                                    name="urdu"
                                    type="text"
                                    dir="rtl"
                                    value={newProduct.urdu}
                                    onChange={handleProductChange}
                                    placeholder="مثلاً ٹماٹر"
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-right
                            text-sm
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                />

                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Product Icon
                                </label>

                                <input
                                    type="text"
                                    name="icon"
                                    value={newProduct.icon}
                                    onChange={handleProductChange}
                                    placeholder="🍅"
                                    maxLength={2}
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                            "
                                />
                            </div>

                            {/* Category */}

                            <div>

                                <label
                                    htmlFor="product-category"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Category
                                </label>

                                <select
                                    id="product-category"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleProductChange}
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                        "
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {Array.isArray(categories) &&
                                        categories.map((category) => (

                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>

                                        ))}

                                </select>

                            </div>

                            {/* Unit + Price */}

                            <div className="grid grid-cols-2 gap-3">

                                <div>

                                    <label
                                        htmlFor="product-unit"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Unit
                                    </label>

                                    <select
                                        id="product-unit"
                                        name="unit"
                                        value={newProduct.unit}
                                        onChange={handleProductChange}
                                        className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-sm
                                outline-none
                                focus:border-green-600
                                focus:ring-2
                                focus:ring-green-100
                            "
                                    >

                                        <option value="">
                                            Unit
                                        </option>

                                        <option value="kg">
                                            kg
                                        </option>

                                        <option value="dozen">
                                            Dozen
                                        </option>

                                        <option value="piece">
                                            Piece
                                        </option>

                                    </select>

                                </div>

                                <div>

                                    <label
                                        htmlFor="product-price"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Price
                                    </label>

                                    <input
                                        id="product-price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={newProduct.price}
                                        onChange={handleProductChange}
                                        placeholder="Rs"
                                        className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                px-4
                                py-3
                                text-sm
                                outline-none
                                focus:border-green-600
                                focus:ring-2
                                focus:ring-green-100
                            "
                                    />

                                </div>

                            </div>

                            {/* Actions */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddProduct(false);
                                        setEditingProduct(null);
                                    }}
                                    className="
                            rounded-xl
                            border
                            border-gray-300
                            px-5
                            py-3
                            text-sm
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
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                            active:scale-95
                        "
                                >
                                    {editingProduct ? "Save Changes" : "Add Product"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}
            {deletingProduct && (

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

                        {/* Icon */}

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

                        {/* Content */}

                        <div className="mt-5 text-center">

                            <h2 className="text-xl font-bold text-gray-800">
                                Delete Product?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">

                                Are you sure you want to delete{" "}

                                <span className="font-semibold text-gray-700">
                                    {deletingProduct.name}
                                </span>

                                ?

                                <br />

                                This action cannot be undone.

                            </p>

                        </div>

                        {/* Buttons */}

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">

                            <button
                                type="button"
                                onClick={() => setDeletingProduct(null)}
                                className="
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-3
                        text-sm
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
                                onClick={handleDeleteProduct}
                                className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        active:scale-95
                    "
                            >
                                Delete Product
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>


    );

}

export default Products;