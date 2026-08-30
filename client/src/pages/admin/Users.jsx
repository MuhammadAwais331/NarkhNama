import { useEffect, useMemo, useState } from "react";

import {
    getUsers,
    deleteUser,
} from "../../services/userService";

import toast from "react-hot-toast";

import {
    FaUsers,
    FaUserShield,
    FaUser,
    FaSearch,
    FaTrash,
} from "react-icons/fa";

function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [deletingUser, setDeletingUser] = useState(null);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            toast.error("Failed to load users.");

        } finally {

            setLoading(false);

        }

    };

    const filteredUsers = useMemo(() => {

        const value = search.toLowerCase().trim();

        return users.filter((user) =>

            user.fullName.toLowerCase().includes(value) ||

            user.email.toLowerCase().includes(value) ||

            user.phone?.toLowerCase().includes(value)

        );

    }, [users, search]);

    const totalUsers = users.length;

    const totalAdmins = users.filter(
        (user) => user.role === "admin"
    ).length;

    const normalUsers = users.filter(
        (user) => user.role === "user"
    ).length;

    const handleDeleteUser = async () => {

        if (!deletingUser) return;

        try {

            await deleteUser(deletingUser._id);

            toast.success("User deleted successfully.");

            setDeletingUser(null);

            loadUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete user."
            );

        }

    };

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">

                        User Management

                    </h1>

                    <p className="mt-1 text-sm text-gray-500">

                        Manage registered users and monitor user accounts.

                    </p>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">

                                Total Users

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {totalUsers}

                            </h2>

                        </div>

                        <FaUsers className="text-3xl text-green-600" />

                    </div>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">

                                Admins

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {totalAdmins}

                            </h2>

                        </div>

                        <FaUserShield className="text-3xl text-blue-600" />

                    </div>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">

                                Normal Users

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {normalUsers}

                            </h2>

                        </div>

                        <FaUser className="text-3xl text-orange-500" />

                    </div>

                </div>

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
                        placeholder="Search by name, email or phone..."
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

            {/* Users Table */}

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
                            User List
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">

                            {filteredUsers.length} users found

                        </p>

                    </div>

                    <FaUsers className="text-xl text-green-600" />

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Name
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-xs uppercase">
                                    Joined
                                </th>

                                <th className="px-5 py-4 text-right text-xs uppercase">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="py-12 text-center text-gray-500"
                                    >

                                        Loading users...

                                    </td>

                                </tr>

                            ) : filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="py-12 text-center text-gray-500"
                                    >

                                        No users found.

                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td className="px-5 py-4">

                                            <div>

                                                <p className="font-semibold text-gray-800">

                                                    {user.fullName}

                                                </p>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">

                                            {user.email}

                                        </td>

                                        <td className="px-5 py-4">

                                            {user.phone || "-"}

                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold

                                        ${user.role === "admin"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }
                                    `}
                                            >

                                                {user.role}

                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold

                                        ${user.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }
                                    `}
                                            >

                                                {user.isActive
                                                    ? "Active"
                                                    : "Inactive"}

                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            {new Date(user.createdAt).toLocaleDateString()}

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex justify-end">

                                                <button
                                                    onClick={() => setDeletingUser(user)}
                                                    className="
                                            cursor-pointer
                                            rounded-lg
                                            p-2
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                        "
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </section>

            {/* Delete Confirmation Modal */}

            {deletingUser && (

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

                                    Delete User

                                </h3>

                                <p className="mt-2 text-sm text-gray-500">

                                    Are you sure you want to delete

                                    <span className="font-semibold text-gray-700">

                                        {" "}{deletingUser.fullName}

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
                                onClick={() => setDeletingUser(null)}
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
                                onClick={handleDeleteUser}
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

                                Delete User

                            </button>

                        </div>

                    </div>

                </div>

            )}
        </div>
    );
}
export default Users;