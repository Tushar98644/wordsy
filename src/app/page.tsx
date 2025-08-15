import { redirect } from "next/navigation";

const LandingPage = () => {
    return (
        redirect('/dashboard')
    );

}

export default LandingPage;