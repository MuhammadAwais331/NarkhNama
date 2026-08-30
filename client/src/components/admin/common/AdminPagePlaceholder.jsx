import { FaTools } from "react-icons/fa";

function AdminPagePlaceholder({ title, description }) {

    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <FaTools size={26} />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    {description}
                </p>

                <span className="mt-5 inline-block rounded-full bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700">
                    Coming Soon
                </span>

            </div>

        </div>
    );
}

export default AdminPagePlaceholder;