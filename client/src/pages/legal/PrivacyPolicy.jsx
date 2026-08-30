import { Link } from "react-router-dom";

function PrivacyPolicy() {

    return (

        <section
            className="
                min-h-screen
                bg-gray-50
                py-16
            "
        >

            <div
                className="
                    mx-auto
                    max-w-5xl
                    rounded-2xl
                    bg-white
                    p-8
                    shadow-lg
                    md:p-12
                "
            >

                <h1
                    className="
                        mb-2
                        text-4xl
                        font-bold
                        text-green-700
                    "
                >
                    Privacy Policy
                </h1>

                <p className="mb-10 text-sm text-gray-500">

                    Last Updated: August 2026

                </p>

                <div className="space-y-8 text-gray-700 leading-8">

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            1. Introduction

                        </h2>

                        <p>

                            Narkh Nama respects your privacy.
                            This Privacy Policy explains how we
                            collect, use, protect and store your
                            information when you use our website.

                        </p>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            2. Information We Collect

                        </h2>

                        <ul className="list-disc space-y-2 pl-6">

                            <li>Name</li>

                            <li>Email address</li>

                            <li>Encrypted password</li>

                            <li>Account preferences</li>

                            <li>Subscription details (future)</li>

                            <li>Technical information such as browser, IP address and device information.</li>

                        </ul>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            3. How We Use Your Information

                        </h2>

                        <ul className="list-disc space-y-2 pl-6">

                            <li>Create and manage your account.</li>

                            <li>Provide access to premium News.</li>

                            <li>Improve website performance.</li>

                            <li>Respond to support requests.</li>

                            <li>Send important account notifications.</li>

                        </ul>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            4. Data Security

                        </h2>

                        <p>

                            We implement reasonable security measures
                            to protect your information from
                            unauthorized access, misuse or disclosure.
                            Passwords are never stored in plain text.

                        </p>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            5. Cookies

                        </h2>

                        <p>

                            We may use cookies to remember your
                            preferences, improve performance and
                            enhance your browsing experience.

                        </p>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            6. Third-Party Services

                        </h2>

                        <p>

                            We may use trusted third-party services
                            such as payment providers, analytics
                            platforms and email services. These
                            services process data according to their
                            own privacy policies.

                        </p>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            7. Your Rights

                        </h2>

                        <ul className="list-disc space-y-2 pl-6">

                            <li>Access your information.</li>

                            <li>Update your profile.</li>

                            <li>Request deletion of your account.</li>

                            <li>Contact us regarding privacy concerns.</li>

                        </ul>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            8. Policy Updates

                        </h2>

                        <p>

                            We may update this Privacy Policy from
                            time to time. Changes become effective
                            immediately after being published.

                        </p>

                    </section>

                    <section>

                        <h2 className="mb-2 text-2xl font-semibold text-gray-900">

                            9. Contact Us

                        </h2>

                        <p>

                            If you have any questions regarding this
                            Privacy Policy, please contact the Narkh
                            Nama support team.

                        </p>

                    </section>

                </div>

                {/* <div className="mt-12 text-center">

                    <Link
                        to="/signup"
                        className="
                            rounded-xl
                            bg-green-600
                            px-8
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                        "
                    >
                        Back to Sign Up
                    </Link>

                </div> */}

            </div>

        </section>

    );

}

export default PrivacyPolicy;