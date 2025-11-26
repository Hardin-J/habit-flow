"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { updateProfile, toggleTwoFactor } from "@/actions/profile"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface SettingsFormProps {
    user: {
        name: string | null
        image: string | null
        dateOfBirth: Date | null
        isTwoFactorEnabled: boolean
    }
}

export function SettingsForm({ user }: SettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function onProfileSubmit(formData: FormData) {
        setIsLoading(true)
        const name = formData.get("name") as string
        const dob = formData.get("dateOfBirth") as string

        // Validation
        if (name && name.length > 20) {
            toast.error("Name must be 20 characters or less")
            setIsLoading(false)
            return
        }

        if (name && /\d/.test(name)) {
            toast.error("Name should not contain numbers")
            setIsLoading(false)
            return
        }

        if (dob) {
            const date = new Date(dob)
            if (date > new Date()) {
                toast.error("Date of birth cannot be in the future")
                setIsLoading(false)
                return
            }
        }

        const result = await updateProfile(formData)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Profile updated successfully!")
        }
        setIsLoading(false)
    }

    async function onToggle2FA(checked: boolean) {
        const result = await toggleTwoFactor(checked)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="p-6 border rounded-xl space-y-4 bg-card text-card-foreground shadow-sm">
                <h2 className="text-xl font-semibold">Profile</h2>
                <form action={onProfileSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border">
                            {user.image ? (
                                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                    <span className="text-2xl font-bold">{user.name?.[0] || "?"}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="image" className="cursor-pointer">
                                <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                                    Change Profile Picture
                                </div>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        // Optional: Add client-side preview logic here if needed
                                        // For now, we rely on server update
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            if (file.size > 1024 * 1024 * 2) { // 2MB limit
                                                toast.error("Image must be less than 2MB")
                                                e.target.value = "" // Reset
                                            } else {
                                                toast.success("Image selected. Click Save Changes to apply.")
                                            }
                                        }
                                    }}
                                />
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                JPG, PNG or GIF. Max 2MB.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={user.name || ""}
                            placeholder="Your Name"
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">Max 20 characters, no numbers.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            defaultValue={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </div>

            <div className="p-6 border rounded-xl space-y-4 bg-card text-card-foreground shadow-sm">
                <h2 className="text-xl font-semibold">Security</h2>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                        </p>
                    </div>
                    <Switch
                        defaultChecked={user.isTwoFactorEnabled}
                        onCheckedChange={onToggle2FA}
                    />
                </div>
            </div>
        </div>
    )
}
