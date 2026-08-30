import AuthLayout from "../../components/auth/AuthLayout";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

function ResetPassword() {
    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Create a strong new password for your account."
        >
            <ResetPasswordForm />
        </AuthLayout>
    );
}

export default ResetPassword;