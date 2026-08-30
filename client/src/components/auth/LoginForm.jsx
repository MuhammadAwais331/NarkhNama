import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { FaEnvelope } from "react-icons/fa";

import PasswordInput from "./PasswordInput";

import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {

    const [loading, setLoading] = useState(false);

    const [failedAttempts, setFailedAttempts] = useState(() => {
        return Number(localStorage.getItem("loginFailedAttempts")) || 0;
    });

    const [cooldown, setCooldown] = useState(0);
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {

            const endTime = Number(
                localStorage.getItem("loginCooldownEnd")
            );

            if (!endTime) {

                setCooldown(0);

                return;

            }

            const remaining = Math.max(
                0,
                Math.ceil((endTime - Date.now()) / 1000)
            );

            setCooldown(remaining);

            if (remaining <= 0) {

                localStorage.removeItem("loginCooldownEnd");
                localStorage.removeItem("loginFailedAttempts");

            }

        }, 1000);

        return () => clearInterval(interval);

    }, []);
    useEffect(() => {

        localStorage.setItem(
            "loginFailedAttempts",
            failedAttempts
        );

    }, [failedAttempts]);
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (cooldown > 0) {

            toast.error(
                `Please wait ${minutes}:${seconds} before trying again.`
            );

            return;

        }


        if (!email.trim()) {

            toast.error("Email is required.");

            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const trimmedEmail = email.trim();

        if (!emailRegex.test(trimmedEmail)) {

            toast.error("Enter a valid email.");

            return;

        }

        if (!password.trim()) {

            toast.error("Password is required.");

            return;

        }

        if (password.length < 8) {

            toast.error("Password must be at least 8 characters.");

            return;

        }

        setLoading(true);

        try {

            const { data } = await api.post("/auth/login", {
                email: trimmedEmail,
                password,
                rememberMe,
            });
            localStorage.setItem("token", data.token);
            toast.success(data.message);

            // We'll replace this later with AuthContext
            login(data.user, data.token);
            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
        catch (error) {

            const attempts = failedAttempts + 1;

            setFailedAttempts(attempts);

            toast.error(
                error.response?.data?.message || "Invalid email or password."
            );

            if (attempts >= 3) {

                const endTime = Date.now() + 30 * 1000;

                localStorage.setItem("loginCooldownEnd", endTime);

                setCooldown(30);

                setFailedAttempts(0);

                localStorage.removeItem("loginFailedAttempts");

                toast.error(
                    "Too many failed attempts. Please wait 30 seconds."
                );
            }

        }
        finally {

            setLoading(false);

        }

    };

    const minutes = String(Math.floor(cooldown / 60)).padStart(2, "0");

    const seconds = String(cooldown % 60).padStart(2, "0");

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Email */}

            <div>

                <label
                    htmlFor="email"
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
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            py-3
                            pl-11
                            pr-4
                            text-gray-800
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />

            {/* Remember Me + Forgot Password */}

            <div className="flex items-center justify-between gap-4">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                    <input
                        type="checkbox"
                        disabled={loading}
                        checked={rememberMe}
                        onChange={(e) =>
                            setRememberMe(e.target.checked)
                        }
                        className="
                            h-4
                            w-4
                            rounded
                            border-gray-300
                            text-green-600
                            focus:ring-green-500
                        "
                    />

                    Remember Me

                </label>

                <Link
                    to="/forgot-password"
                    className="
                        text-sm
                        font-medium
                        text-green-700
                        hover:underline
                    "
                >
                    Forgot Password?
                </Link>

            </div>

            {/* Login Button */}

            <button

                type="submit"

                disabled={loading || cooldown > 0}

                className={`
        w-full
        rounded-xl
        py-3
        font-semibold
        text-white
        transition

        ${loading || cooldown > 0
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-green-600 hover:bg-green-700 active:scale-95"
                    }
    `}

            >

                {

                    loading

                        ? "Logging in..."

                        : cooldown > 0

                            ? `Try Again in ${minutes}:${seconds}`

                            : "Login"

                }

            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-300"></div>

                <span className="text-sm text-gray-500">

                    OR

                </span>

                <div className="h-px flex-1 bg-gray-300"></div>

            </div>

            {/* Signup */}

            <p className="text-center text-sm text-gray-600">

                Don't have an account?{" "}

                <Link
                    to="/signup"
                    className="
                        font-semibold
                        text-green-700
                        hover:underline
                    "
                >
                    Create Account
                </Link>

            </p>

        </form>

    );

}

export default LoginForm;