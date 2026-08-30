import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function SignupForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        password: "",

        confirmPassword: "",

    });

    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (formData.password !== formData.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        if (!acceptTerms) {

            toast.error("Please accept the Terms & Conditions.");

            return;

        }

        try {
            setLoading(true);

            // Backend signup request will go here
            const response = await registerUser({
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            toast.success(response.message);
            navigate("/login");

            // Navigate to login here

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create account."
            );
        } finally {
            setLoading(false);
        }

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Full Name */}

            <div>

                <label
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >

                    Full Name

                </label>

                <div className="relative">

                    <FaUser
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input

                        type="text"

                        name="fullName"

                        value={formData.fullName}

                        onChange={handleChange}

                        placeholder="Enter your full name"

                        required

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
                        "

                    />

                </div>

            </div>

            {/* Email */}

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

                        name="email"

                        value={formData.email}

                        onChange={handleChange}

                        placeholder="Enter your email"

                        required

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
                        "

                    />

                </div>

            </div>

            {/* Phone */}

            <div>

                <label
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >

                    Phone Number
                    <span className="text-gray-400">
                        {" "} (Optional)
                    </span>

                </label>

                <div className="relative">

                    <FaPhone
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />

                    <input

                        type="tel"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                        placeholder="03XXXXXXXXX"

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
                        "

                    />

                </div>

            </div>

            {/* Password */}

            <PasswordInput

                name="password"

                label="Password"

                value={formData.password}

                onChange={handleChange}

            />

            <PasswordStrength
                password={formData.password}
            />

            {/* Confirm Password */}

            <PasswordInput

                name="confirmPassword"

                label="Confirm Password"

                value={formData.confirmPassword}

                onChange={handleChange}

            />

            {/* Terms */}

            <label
                className="
                    flex
                    items-start
                    gap-3
                    text-sm
                    text-gray-600
                "
            >

                <input

                    type="checkbox"

                    checked={acceptTerms}

                    onChange={() =>
                        setAcceptTerms(!acceptTerms)
                    }

                    className="mt-1"

                />

                <span>

                    I agree to the{" "}
                    <Link
                        to="/terms-and-conditions"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Terms & Conditions
                    </Link>
                    {" "}and{" "}
                    <Link
                        to="/privacy-policy"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Privacy Policy
                    </Link>

                </span>

            </label>

            {/* Button */}

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
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 active:scale-95"
                    }
    `}
            >

                {
                    loading
                        ? `Account Creating...`
                        : "Create Account"
                }

            </button>

            <p
                className="
                    text-center
                    text-sm
                    text-gray-600
                "
            >

                Already have an account?{" "}

                <Link
                    to="/login"
                    className="
                        font-semibold
                        text-green-700
                        hover:underline
                    "
                >

                    Login

                </Link>

            </p>

        </form>

    );

}

export default SignupForm;