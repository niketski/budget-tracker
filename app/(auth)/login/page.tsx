import LoginForm from "./login-form";

const SignUpPage = async () => {
    return ( <>
        <section className="py-20 min-h-screen">
            <div className="container">
                <h1 className="text-center text-muted-foreground">Login</h1>
                <div className="max-w-[400px] mx-auto mt-10">
                    <LoginForm/>
                </div>
            </div>
        </section>
    </> );
}
 
export default SignUpPage;