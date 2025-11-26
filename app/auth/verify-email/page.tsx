"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { verifyEmail } from "@/actions/verify-email"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    useEffect(() => {
        if (!token) {
            setError("Missing token!")
            return
        }

        verifyEmail(token)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setSuccess(data.success)
                }
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold">Email Verification</h1>
            {!success && !error && <p>Verifying your email...</p>}
            {success && (
                <div className="text-center space-y-4">
                    <p className="text-green-500">{success}</p>
                    <Link href="/login">
                        <Button>Back to Login</Button>
                    </Link>
                </div>
            )}
            {error && (
                <div className="text-center space-y-4">
                    <p className="text-red-500">{error}</p>
                    <Link href="/login">
                        <Button variant="outline">Back to Login</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default function VerifyEmailPage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <Suspense fallback={<p>Loading...</p>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    )
}
