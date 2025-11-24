import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms and Conditions</h1>
                        <p className="text-muted-foreground">Last Updated: November 24, 2025</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            By accessing or using HabitFlow, you agree to be bound by these Terms and Conditions.
                            If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Description of Service</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            HabitFlow is a productivity tool designed to help users track habits and visualize progress.
                            We provide features such as streak tracking, analytics, and reminders.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. User Accounts</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>You are responsible for maintaining the confidentiality of your login credentials (Google/Email).</li>
                            <li>You agree to provide accurate and current information.</li>
                            <li>We reserve the right to terminate accounts that violate these terms or engage in illegal activity.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. Acceptable Use</h2>
                        <p className="text-muted-foreground">You agree not to:</p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Use the service for any unlawful purpose.</li>
                            <li>Attempt to reverse engineer or hack the application.</li>
                            <li>Harass other users or interfere with the proper working of the service.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            The source code, design, features, and branding of HabitFlow are owned by us.
                            You retain ownership of the data (habits and logs) you enter into the system.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
                        <p className="text-muted-foreground">The service is provided on an "AS IS" and "AS AVAILABLE" basis.</p>
                        <p className="text-muted-foreground">We are not liable for:</p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Any loss of data, streaks, or progress due to technical errors or downtime.</li>
                            <li>Any indirect, incidental, or consequential damages arising from your use of the service.</li>
                            <li>Since this is a productivity tool, we do not guarantee specific life results or behavioral changes.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">7. Modifications to Service</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time,
                            with or without notice.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">8. Governing Law</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            These Terms shall be governed by and defined following the laws of India. Any dispute arising in
                            relation to these terms shall be subject to the jurisdiction of the courts in India.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">9. Contact</h2>
                        <p className="leading-relaxed text-muted-foreground">
                            For any questions regarding these Terms, please contact us at: <br />
                            <a href="mailto:support@habitflow.com" className="text-primary hover:underline">support@habitflow.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}