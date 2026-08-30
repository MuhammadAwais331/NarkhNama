import AuthLayout from "../../components/auth/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

function ForgotPassword() {
    return (
        <AuthLayout
            title="Forgot Password"
            subtitle="Enter your registered email address. We'll send you a password reset link."
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}

export default ForgotPassword;