import { auth } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import { SettingsForm } from "@/components/dashboard/settings-form"

export default async function SettingsPage() {
    const session = await auth()
    if (!session?.user?.id) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    })

    if (!user) redirect("/login")

    return (
        <div className="max-w-2xl mx-auto p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <SettingsForm user={{
                name: user.name,
                image: user.image,
                dateOfBirth: user.dateOfBirth,
                isTwoFactorEnabled: user.isTwoFactorEnabled
            }} />
        </div>
    )
}
