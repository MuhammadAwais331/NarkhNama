import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { FaHome, FaSearch } from "react-icons/fa";

function NotFound() {

    const navigate = useNavigate();

    return (

        <MainLayout>

            <section className="min-h-[80vh] flex items-center justify-center bg-gray-50">

                <div className="max-w-2xl mx-auto px-4 text-center">

                    {/* 404 */}

                    <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-green-600">

                        404

                    </h1>

                    {/* Title */}

                    <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">

                        Page Not Found

                    </h2>

                    {/* Description */}

                    <p className="mt-4 text-gray-600 leading-8 max-w-xl mx-auto">

                        Sorry, the page you are looking for doesn't exist,
                        has been moved, or the URL is incorrect.

                    </p>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                        <button
                            onClick={() => navigate("/")}
                            className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-green-600
                            hover:bg-green-700
                            active:scale-95
                            transition
                            px-8
                            py-3
                            text-white
                            font-semibold"
                        >

                            <FaHome />

                            Go Home

                        </button>

                        <button
                            onClick={() =>
                                navigate("/", {
                                    state: {
                                        section: "categories",
                                    },
                                })
                            }
                            className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-green-600
                            text-green-700
                            hover:bg-green-50
                            active:scale-95
                            transition
                            px-8
                            py-3
                            font-semibold"
                        >

                            <FaSearch />

                            Browse Products

                        </button>

                    </div>

                </div>

            </section>

        </MainLayout>

    );

}

export default NotFound;