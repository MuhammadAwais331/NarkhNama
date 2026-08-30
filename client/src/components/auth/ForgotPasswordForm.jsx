import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import toast from "react-hot-toast";

function ForgotPasswordForm() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Email is required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {

            // ===============================
            // Backend API will go here later
            // ===============================

            console.log({
                email: trimmedEmail,
            });

            // Simulate API delay
            await new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );

            setEmailSent(true);

            toast.success(
                "Password reset link sent successfully."
            );

        } catch {

            toast.error(
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    if (emailSent) {

        return (

            <div className="space-y-6 text-center">

                <div className="flex justify-center">

                    <FaCircleCheck
                        className="text-6xl text-green-600"
                    />

                </div>

                <h2 className="text-2xl font-bold text-gray-800">

                    Check Your Email

                </h2>

                <p className="text-gray-600">

                    If an account exists with

                    <span className="font-semibold">
                        {" "}{email}
                    </span>

                    , we've sent a password reset link.

                </p>

                <p className="text-sm text-gray-500">

                    Didn't receive the email? Check your spam folder
                    or try again.

                </p>

                <button
                    onClick={() => {

                        setEmail("");
                        setEmailSent(false);

                    }}
                    className="
                        w-full
                        rounded-xl
                        bg-green-600
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-green-700
                        active:scale-95
                    "
                >

                    Send Another Link

                </button>

                <Link
                    to="/login"
                    className="
                        block
                        text-sm
                        font-semibold
                        text-green-700
                        hover:underline
                    "
                >

                    Back to Login

                </Link>

            </div>

        );

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div>

                <label
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >

                    Email Address

                </label>

                <div className="relative">

                    <FaEnvelope
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your registered email"
                        value={email}
                        disabled={loading}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            py-3
                            pl-11
                            pr-4
                            outline-none
                            transition
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-200
                            disabled:cursor-not-allowed
                            disabled:bg-gray-100
                        "
                    />

                </div>

            </div>

            <button
                type="submit"
                disabled={loading}
                className={`
                    w-full
                    rounded-xl
                    py-3
                    font-semibold
                    text-white
                    transition

                    ${loading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-green-600 hover:bg-green-700 active:scale-95"
                    }
                `}
            >

                {loading
                    ? "Sending Reset Link..."
                    : "Send Reset Link"}

            </button>

            {/* <div className="text-center text-sm">

                <Link
                    to="/login"
                    className="
                        font-semibold
                        text-green-700
                        hover:underline
                    "
                >

                    Back to Login

                </Link>

            </div> */}

        </form>

    );

}

export default ForgotPasswordForm;