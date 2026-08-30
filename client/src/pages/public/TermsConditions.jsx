import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaFileContract,
    FaShieldAlt,
    FaUserCheck,
    FaGavel,
    FaExclamationTriangle,
    FaLock,
    FaUserSlash,
    FaSyncAlt,
    FaEnvelope,
} from "react-icons/fa";

function TermsAndConditions() {
    const lastUpdated = "06 August 2026";

    const sections = [
        {
            icon: <FaUserCheck />,
            title: "1. Acceptance of Terms",
            content:
                "By accessing or using Narkh Nama, you agree to comply with these Terms and Conditions. If you do not agree, please discontinue using the website.",
        },
        {
            icon: <FaUserCheck />,
            title: "2. Eligibility",
            content:
                "You must provide accurate information during registration and are responsible for maintaining the confidentiality of your account credentials.",
        },
        {
            icon: <FaShieldAlt />,
            title: "3. User Accounts",
            content:
                "Each user should maintain only one account. Sharing passwords or allowing unauthorized access to your account is strictly prohibited.",
        },
        {
            icon: <FaGavel />,
            title: "4. User Responsibilities",
            content:
                "Users must not misuse the platform, submit false information, attempt unauthorized access, or interfere with the website's normal operation.",
        },
        {
            icon: <FaExclamationTriangle />,
            title: "5. Market Prices Disclaimer",
            content:
                "Prices displayed on Narkh Nama are for informational purposes only. Actual market prices may vary depending on local market conditions.",
        },
        {
            icon: <FaShieldAlt />,
            title: "6. Administrator Rights",
            content:
                "Administrators reserve the right to update prices, modify content, suspend accounts, or remove any information that violates these terms.",
        },
        {
            icon: <FaFileContract />,
            title: "7. Paid Services (Future)",
            content:
                "Some premium features, including news subscriptions, may require payment in the future. Subscription details will be provided before purchase.",
        },
        {
            icon: <FaLock />,
            title: "8. Privacy",
            content:
                "Your personal information is handled securely. Passwords are encrypted, and your data will not be sold or shared without legal obligation.",
        },
        {
            icon: <FaUserSlash />,
            title: "9. Account Suspension",
            content:
                "Accounts involved in fraudulent activity, abuse, fake registrations, or repeated violations may be suspended or permanently removed.",
        },
        {
            icon: <FaFileContract />,
            title: "10. Intellectual Property",
            content:
                "The Narkh Nama name, logo, website design, source code, and published content are protected and may not be copied or redistributed without permission.",
        },
        {
            icon: <FaExclamationTriangle />,
            title: "11. Limitation of Liability",
            content:
                "Narkh Nama is not responsible for financial losses resulting from market price changes, service interruptions, or user decisions based on displayed information.",
        },
        {
            icon: <FaSyncAlt />,
            title: "12. Updates to These Terms",
            content:
                "These Terms and Conditions may be updated periodically. Continued use of the platform after updates constitutes acceptance of the revised terms.",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-5xl px-5">

                {/* Back Button */}

                {/* <Link
                    to="/signup"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-2 py-1 lg:px-3 lg:py-2 font-medium text-white transition hover:bg-green-700 active:scale-95"
                >
                    <FaArrowLeft />
                    Back
                </Link> */}

                {/* Header */}

                <div className="rounded-2xl bg-green-700 p-8 text-center text-white shadow-lg">
                    <FaFileContract className="mx-auto mb-4 text-5xl" />

                    <h1 className="text-2xl lg:text-3xl font-bold">
                        Terms & Conditions
                    </h1>

                    <p className="mt-3 text-green-100">
                        Please read these Terms and Conditions carefully before
                        using Narkh Nama.
                    </p>

                    <p className="mt-4 text-sm text-green-200">
                        Last Updated: {lastUpdated}
                    </p>
                </div>

                {/* Sections */}

                <div className="mt-8 space-y-6">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white p-6 shadow-md"
                        >
                            <div className="mb-4 flex items-center gap-3 text-green-700">
                                <div className="text-2xl">
                                    {section.icon}
                                </div>

                                <h2 className="text-xl font-bold">
                                    {section.title}
                                </h2>
                            </div>

                            <p className="leading-8 text-gray-700">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact */}

                <div className="mt-10 rounded-2xl bg-green-50 p-6 shadow">
                    <h3 className="mb-4 text-xl font-bold text-green-700">
                        Need Help?
                    </h3>

                    <div className="flex items-center gap-3 text-gray-700">
                        <FaEnvelope className="text-green-600" />

                        <span>support@narkhnama.com</span>
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        If you have any questions regarding these Terms &
                        Conditions, please contact the Narkh Nama support team.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default TermsAndConditions;