function PasswordStrength({ password }) {

    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passed = Object.values(checks).filter(Boolean).length;

    let strength = "Weak";
    let color = "bg-red-500";

    if (passed >= 3) {
        strength = "Medium";
        color = "bg-yellow-500";
    }

    if (passed === 5) {
        strength = "Strong";
        color = "bg-green-600";
    }

    return (

        <div className="mt-3">

            {/* Progress Bar */}

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

                <div
                    className={`h-full transition-all duration-300 ${color}`}
                    style={{
                        width: `${(passed / 5) * 100}%`,
                    }}
                />

            </div>

            {/* Status */}

            <p className="mt-2 text-sm font-medium text-gray-700">

                Password Strength:
                <span
                    className={`ml-2 ${
                        strength === "Strong"
                            ? "text-green-600"
                            : strength === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                >
                    {strength}
                </span>

            </p>

            {/* Requirements */}

            <ul className="mt-3 space-y-1 text-sm">

                <li className={checks.length ? "text-green-600" : "text-gray-500"}>
                    ✓ Minimum 8 characters
                </li>

                <li className={checks.upper ? "text-green-600" : "text-gray-500"}>
                    ✓ One uppercase letter
                </li>

                <li className={checks.lower ? "text-green-600" : "text-gray-500"}>
                    ✓ One lowercase letter
                </li>

                <li className={checks.number ? "text-green-600" : "text-gray-500"}>
                    ✓ One number
                </li>

                <li className={checks.special ? "text-green-600" : "text-gray-500"}>
                    ✓ One special character
                </li>

            </ul>

        </div>

    );

}

export default PasswordStrength;