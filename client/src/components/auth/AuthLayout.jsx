const logo = "/logo.png";
function AuthLayout({ children, title, subtitle }) {
    return (
        <section className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800">

            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                    {/* Left Side */}

                    <div className="hidden flex-col justify-center bg-gradient-to-br from-green-700 to-green-900 p-12 text-white lg:flex">

                        <img
                            src={logo}
                            alt="Narkh Nama"
                            className="mb-8 h-24 w-24 rounded-full bg-white p-3 shadow-lg"
                        />

                        <h1 className="text-4xl font-extrabold tracking-wide">
                            Narkh Nama
                        </h1>

                        <p className="mt-4 text-lg leading-8 text-green-100">
                            Official Market Price Monitoring System for
                            District Lower Dir.
                        </p>

                        <div className="mt-10 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">

                            <h3 className="mb-3 text-xl font-bold">
                                Features
                            </h3>

                            <ul className="space-y-3 text-green-100">

                                <li>✔ Daily Government Prices</li>

                                <li>✔ Price Trend Analysis</li>

                                <li>✔ Official Announcements</li>

                                <li>✔ Printable Price Lists</li>

                            </ul>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="flex items-center justify-center bg-white p-6 sm:p-10">

                        <div className="w-full max-w-md">

                            {/* Mobile Logo */}

                            <div className="mb-8 flex flex-col items-center lg:hidden">

                                <img
                                    src={logo}
                                    alt="Narkh Nama"
                                    className="mb-4 h-20 w-20 rounded-full border-4 border-green-100"
                                />

                                <h1 className="text-3xl font-bold text-green-700">
                                    Narkh Nama
                                </h1>

                            </div>

                            <h2 className="text-3xl font-bold text-gray-900">

                                {title}

                            </h2>

                            <p className="mt-2 text-gray-500">

                                {subtitle}

                            </p>

                            <div className="mt-8">

                                {children}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AuthLayout;