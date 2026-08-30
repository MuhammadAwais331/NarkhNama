import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function PasswordInput({
    value,
    onChange,
    name = "password",
    placeholder = "Enter Password",
    label = "Password",
    disabled = false,
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div>

            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-gray-700"
            >
                {label}
            </label>

            <div className="relative">

                {/* Lock Icon */}

                <FaLock
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                {/* Password Input */}

                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={name}
                    disabled={disabled}
                    required
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        py-3
                        pl-11
                        pr-12
                        text-gray-800
                        outline-none
                        transition
                        focus:border-green-600
                        focus:ring-2
                        focus:ring-green-200
                    "
                />

                {/* Show / Hide Button */}

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                        hover:text-green-700
                        transition
                    "
                >
                    {showPassword ? (
                        <FaEyeSlash />
                    ) : (
                        <FaEye />
                    )}
                </button>

            </div>

        </div>

    );
}

export default PasswordInput;