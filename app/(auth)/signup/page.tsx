import SignUpForm from "./signup-form";

const SignUpPage = () => {
    return ( <>
        <section className="py-20 min-h-screen">
            <div className="container">
                <h1 className="text-center text-muted-foreground">Sign <span className="text-primary">up</span></h1>
                <div className="max-w-[400px] mx-auto mt-10">
                    <SignUpForm/>
                </div>
            </div>
        </section>
    </> );
}
 
export default SignUpPage;