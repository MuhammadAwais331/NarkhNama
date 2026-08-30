import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";

function ResetPasswordForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        const password = formData.password.trim();
        const confirmPassword = formData.confirmPassword.trim();

        if (!password) {
            toast.error("New password is required.");
            return;
        }

        if (password.length < 8) {
            toast.error(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error(
                "Password must contain at least one uppercase letter."
            );
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error(
                "Password must contain at least one lowercase letter."
            );
            return;
        }

        if (!/[0-9]/.test(password)) {
            toast.error(
                "Password must contain at least one number."
            );
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error(
                "Password must contain at least one special character."
            );
            return;
        }

        if (!confirmPassword) {
            toast.error("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            // ===============================
            // Backend API will go here later
            // ===============================

            console.log({
                password,
            });

            toast.success(
                "Password updated successfully."
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch {

            toast.error(
                "Unable to update password. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <PasswordInput
                name="password"
                label="New Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
            />

            <PasswordStrength
                password={formData.password}
            />

            <PasswordInput
                name="confirmPassword"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
            />

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
                    ? "Updating Password..."
                    : "Update Password"}

            </button>

            {/* <div className="text-center">

                <Link
                    to="/login"
                    className="
                        text-sm
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

export default ResetPasswordForm;