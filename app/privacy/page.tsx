import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last Updated: November 24, 2025</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">1. Introduction</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            Welcome to HabitFlow ("we," "our," or "us"). We are committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your information when you
                            use our website and Progressive Web App (PWA).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>

                        <div className="space-y-2">
                            <h3 className="text-xl font-medium">A. Information You Provide</h3>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Account Information:</strong> When you sign up via Google or Email,
                                    we collect your name, email address, and profile picture.
                                </li>
                                <li>
                                    <strong className="text-foreground">User Content:</strong> We collect the specific habits you create,
                                    your descriptions, reminder times, and your daily completion logs (streak data).
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-medium">B. Automatically Collected Information</h3>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Device Information:</strong> As a PWA, we may store local data on
                                    your device to enable offline functionality.
                                </li>
                                <li>
                                    <strong className="text-foreground">Usage Data:</strong> We may collect anonymous data on how you
                                    interact with the dashboard (e.g., button clicks, features used) to improve the user experience.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground">We use your data solely to provide the HabitFlow service:</p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>To create and manage your account.</li>
                            <li>To visualize your progress, calculate streaks, and generate analytics.</li>
                            <li>To send you push notifications and email reminders (if enabled).</li>
                            <li>To prevent fraud and ensure the security of the platform.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. Data Sharing and Third Parties</h2>
                        <p className="text-muted-foreground">
                            We do not sell your personal data. We only share data with trusted service providers required to run the app:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li><strong className="text-foreground">Authentication:</strong> Google OAuth (for secure login).</li>
                            <li><strong className="text-foreground">Database:</strong> Neon.tech (PostgreSQL) for secure data storage.</li>
                            <li><strong className="text-foreground">Hosting:</strong> Vercel (for application hosting).</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Data Security</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We implement industry-standard security measures, including encryption in transit (HTTPS) and secure
                            database credentials. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">6. Your Rights</h2>
                        <p className="text-muted-foreground">You have the right to:</p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Access the personal data we hold about you.</li>
                            <li>Request the deletion of your account and all associated data.</li>
                            <li>Update your habits and preferences at any time via the Dashboard.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                            the new policy on this page.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            If you have any questions, please contact us at: <br />
                            <a href="mailto:support@habitflow.com" className="text-primary hover:underline">support@habitflow.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
