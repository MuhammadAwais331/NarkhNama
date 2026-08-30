import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

function Signup() {

    return (

        <AuthLayout
            title="Create Account"
            subtitle="Register to access Narkh Nama services."
        >

            <SignupForm />

        </AuthLayout>

    );

}

export default Signup;