import {
    FaBoxOpen,
    FaTags,
    FaMoneyBillWave,
    FaBullhorn,
    FaArrowUp,
    FaArrowDown,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSiteSettings } from "../../data/SiteSettings";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getAnnouncements } from "../../services/announcementService";

function Dashboard() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    const stats = [
        {
            title: "Total Products",
            value: products.length,
            icon: FaBoxOpen,
            description: "Products available",
        },
        {
            title: "Categories",
            value: categories.length,
            icon: FaTags,
            description: "Active categories",
        },
        {
            title: "Price Updates",
            value: Array.isArray(products)
                ? products.filter(product => product.currentPrice > 0).length
                : 0,
            icon: FaMoneyBillWave,
            description: "Products with prices",
        },
        {
            title: "Announcements",
            value: announcements.length,
            icon: FaBullhorn,
            description: "Published announcements",
        },
    ];

    const recentPrices = [...(products || [])]
        .sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        )
        .slice(0, 5);

    const [siteSettings, setSiteSettings] = useState({
        lastUpdated: "",
        verified: false,
    });

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    productsResponse,
                    categories,
                    announcements,
                    settings,
                ] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getAnnouncements(),
                    getSiteSettings(),
                ]);

                // Product service returns the whole API response
                setProducts(productsResponse.data || []);
                // Category service returns the array directly
                setCategories(categories || []);

                // Announcement service returns the array directly
                setAnnouncements(announcements || []);

                // Site settings
                setSiteSettings(settings);

            } catch (error) {
                console.error(error);
            }
        };

        loadDashboard();
    }, []);

    return (

        <div className="space-y-6">

            {/* Page Header */}

            <div>

                <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                    Dashboard
                </h2>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Welcome back, Admin. Here's what's happening today.
                </p>

            </div>

            {/* Statistics */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            key={stat.title}
                            className="
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                                shadow-sm
                                transition
                                hover:-translate-y-1
                                hover:shadow-md
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h3 className="mt-2 text-2xl font-bold text-gray-800">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {stat.description}
                                    </p>

                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-green-50
                                        p-3
                                        text-green-600
                                    "
                                >

                                    <Icon size={22} />

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Quick Actions */}

            <section>

                <div className="mb-4">

                    <h3 className="text-lg font-bold text-gray-800">
                        Quick Actions
                    </h3>

                    <p className="text-sm text-gray-500">
                        Frequently used admin actions
                    </p>

                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/products", {
                                state: { openAddModal: true },
                            })
                        }
                        className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-4
                            text-left
                            shadow-sm
                            transition
                            hover:border-green-300
                            hover:bg-green-50
                        "
                    >

                        <FaBoxOpen className="text-xl text-green-600" />

                        <p className="mt-3 font-semibold text-gray-800">
                            Add Product
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Add a new product
                        </p>

                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-4
                            text-left
                            shadow-sm
                            transition
                            hover:border-green-300
                            hover:bg-green-50
                        "
                    >

                        <FaMoneyBillWave className="text-xl text-green-600" />

                        <p className="mt-3 font-semibold text-gray-800">
                            Update Prices
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Update today's prices
                        </p>

                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/announcements")}
                        className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-4
                            text-left
                            shadow-sm
                            transition
                            hover:border-green-300
                            hover:bg-green-50
                        "
                    >

                        <FaBullhorn className="text-xl text-green-600" />

                        <p className="mt-3 font-semibold text-gray-800">
                            Announcement
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Publish an announcement
                        </p>

                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/categories")}
                        className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-4
                            text-left
                            shadow-sm
                            transition
                            hover:border-green-300
                            hover:bg-green-50
                        "
                    >

                        <FaTags className="text-xl text-green-600" />

                        <p className="mt-3 font-semibold text-gray-800">
                            Categories
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Manage categories
                        </p>

                    </button>

                </div>

            </section>

            {/* Recent Price Updates */}

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

                <div className="border-b border-gray-200 p-5">

                    <h3 className="font-bold text-gray-800">
                        Recent Price Updates
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Latest changes in market prices
                    </p>

                </div>

                {/* Responsive table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[600px] text-left">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Product
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Category
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Current Price
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Change
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {recentPrices.map((item) => (

                                <tr
                                    key={item._id}
                                    className="hover:bg-gray-50"
                                >

                                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                        {item.name}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {item.category?.name || "-"}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                                        Rs {item.price} / {item.unit}
                                    </td>

                                    <td className="px-5 py-4">

                                        {/* <span
                                            className={`
                                                inline-flex
                                                items-center
                                                gap-1
                                                rounded-full
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-semibold

                                                ${item.direction === "up"
                                                    ? "bg-red-50 text-red-600"
                                                    : "bg-green-50 text-green-600"
                                                }
                                            `}
                                        >

                                            {item.direction === "up"
                                                ? <FaArrowUp />
                                                : <FaArrowDown />
                                            }

                                            {item.change}

                                        </span> */}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>

            {/* Bottom Sections */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* System Status */}

                <section
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    "
                >

                    <h3 className="font-bold text-gray-800">
                        System Status
                    </h3>

                    <div className="mt-4 space-y-4">

                        <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-600">
                                Price system
                            </span>

                            <span className="flex items-center gap-2 text-sm font-medium text-green-600">

                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                Operational

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-600">
                                Public website
                            </span>

                            <span className="flex items-center gap-2 text-sm font-medium text-green-600">

                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                Online

                            </span>

                        </div>

                    </div>

                </section>

                {/* Last Updated */}

                <section
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    "
                >

                    <h3 className="font-bold text-gray-800">
                        Last Updated
                    </h3>

                    <p className="mt-4 text-sm text-gray-500">
                        Price information was last updated.
                    </p>

                    <p className="mt-2 text-lg font-semibold text-green-700">
                        {siteSettings.lastUpdated
                            ? new Date(siteSettings.lastUpdated).toLocaleDateString()
                            : "Not updated yet"}
                    </p>

                </section>

            </div>

        </div>

    );
}

export default Dashboard;