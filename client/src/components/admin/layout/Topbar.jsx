import {
    FaBars,
    FaBell,
    FaUserCircle,
} from "react-icons/fa";

function Topbar({ setSidebarOpen }) {

    return (

        <header
            className="
                sticky
                top-0
                z-30
                flex
                min-h-16
                items-center
                justify-between
                gap-4
                border-b
                border-gray-200
                bg-white
                px-4
                py-3
                shadow-sm
                sm:px-6
                lg:px-8
            "
        >

            {/* Left Side */}

            <div className="flex min-w-0 items-center gap-3">

                {/* Mobile Menu */}

                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open admin menu"
                    className="
                        rounded-lg
                        p-2
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        hover:text-green-700
                        lg:hidden
                    "
                >
                    <FaBars size={20} />
                </button>

                {/* Page Title */}

                <div className="min-w-0">

                    <h1
                        className="
                            truncate
                            text-lg
                            font-bold
                            text-gray-800
                            sm:text-xl
                        "
                    >
                        Admin Dashboard
                    </h1>

                    <p
                        className="
                            hidden
                            text-xs
                            text-gray-500
                            sm:block
                        "
                    >
                        Manage Narkh Nama
                    </p>

                </div>

            </div>

            {/* Right Side */}

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">

                {/* Notifications */}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="
                        relative
                        rounded-lg
                        p-2
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        hover:text-green-700
                    "
                >

                    <FaBell size={19} />

                    {/* Notification Badge */}

                    <span
                        className="
                            absolute
                            right-1
                            top-1
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />

                </button>

                {/* Divider */}

                <div className="hidden h-8 w-px bg-gray-200 sm:block" />

                {/* Admin Profile */}

                <button
                    type="button"
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        p-1.5
                        transition
                        hover:bg-gray-100
                    "
                >

                    <FaUserCircle
                        className="text-green-700"
                        size={30}
                    />

                    <div className="hidden text-left sm:block">

                        <p className="text-sm font-semibold text-gray-800">
                            Admin
                        </p>

                        <p className="text-xs text-gray-500">
                            Administrator
                        </p>

                    </div>

                </button>

            </div>

        </header>

    );

}

export default Topbar;