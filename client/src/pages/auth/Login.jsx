import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function Login() {

    return (

        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Sign in to your Narkh Nama account"
        >

            <LoginForm />

        </AuthLayout>

    );

}

export default Login;