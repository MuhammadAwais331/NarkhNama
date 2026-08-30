import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    FaTimes,
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaMoneyBillWave,
    FaBullhorn,
    FaNewspaper,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [

    {
        name: "Dashboard",
        path: "/admin",
        icon: FaTachometerAlt,
    },

    {
        name: "Products",
        path: "/admin/products",
        icon: FaBoxOpen,
    },

    {
        name: "Categories",
        path: "/admin/categories",
        icon: FaTags,
    },

    {
        name: "Announcements",
        path: "/admin/announcements",
        icon: FaBullhorn,
    },

    {
        name: "News",
        path: "/admin/news",
        icon: FaNewspaper,
    },

    {
        name: "Users",
        path: "/admin/users",
        icon: FaUsers,
    },

    {
        name: "Reports",
        path: "/admin/reports",
        icon: FaChartBar,
    },

    {
        name: "Settings",
        path: "/admin/settings",
        icon: FaCog,
    },

];

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // if you store user

        navigate("/login");
    };
    return (

        <>

            {/* Mobile Overlay */}

            {sidebarOpen && (

                <div
                    onClick={() => setSidebarOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        lg:hidden
                    "
                />

            )}

            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-72
                    flex-col
                    bg-green-700
                    text-white
                    shadow-xl
                    transition-transform
                    duration-300

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    lg:translate-x-0
                `}
            >

                {/* Header */}

                <div
                    className="
                        flex
                        h-20
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-green-600
                        px-5
                    "
                >

                    <div>

                        <h1 className="text-xl font-bold">
                            Narkh Nama
                        </h1>

                        <p className="text-xs text-green-200">
                            Admin Panel
                        </p>

                    </div>

                    {/* Close button - Mobile */}

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-green-600
                            lg:hidden
                        "
                    >

                        <FaTimes size={20} />

                    </button>

                </div>

                {/* Navigation */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-2
                        py-4
                    "
                >

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => `
        mx-1
        mb-2
        flex
        items-center
        gap-3
        rounded-lg
        px-4
        py-3
        text-sm
        font-medium
        transition

        ${isActive
                                        ? "bg-white text-green-700 shadow-sm"
                                        : "text-green-100 hover:bg-green-600 hover:text-white"
                                    }
    `}
                            >
                                <Icon size={18} />

                                <span>{item.name}</span>
                            </NavLink>

                        );

                    })}

                </nav>

                {/* Logout */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-green-600
                        p-4
                    "
                >

                    <button
                        onClick={handleLogout}
                        type="button"
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-lg
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-green-100
                            transition
                            hover:bg-red-500
                            hover:text-white
                        "
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </aside>

        </>

    );

}

export default Sidebar;