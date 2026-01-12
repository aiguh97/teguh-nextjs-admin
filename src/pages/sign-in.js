import LoginForm from "@/components/form/LoginForm"
import WithUnprotected from "@/hoc/withUnprotected"
import { NextSeo } from "next-seo"

const SignIn = () => {
    return (
        <>
            <NextSeo title='Sign in - Dwi Wijaya' />
            <main>
                <LoginForm />
            </main>
        </>
    )
}

export default WithUnprotected(SignIn)