import { signIn } from "@/app/api/auth/[...nextauth]/auth"
import { LoginUI } from "@/components/auth/login-ui"

export default function LoginPage() {
    async function handleGoogleSignIn() {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
    }

    async function handleGithubSignIn() {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
    }

    return (
        <LoginUI
            onGoogleSignIn={handleGoogleSignIn}
            onGithubSignIn={handleGithubSignIn}
        />
    )
}