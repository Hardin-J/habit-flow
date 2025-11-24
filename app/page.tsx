import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap, Shield, Star, Mail, Github, Twitter } from "lucide-react"
import { redirect } from "next/navigation"
import { auth } from "./api/auth/[...nextauth]/auth"

export default async function LandingPage() {
  const session = await auth()

  // If already logged in, skip the sales pitch
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-orange-500 mr-2" />
          <span className="font-bold text-xl tracking-tight">HabitFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden md:block" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden md:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden md:block" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
            Sign In
          </Link>
          <Link href="/login">
            <Button size="sm" className="rounded-full px-6">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-20 blur-[100px]"></div>

          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Build Habits That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Stick</span>.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                  The smart habit tracker that helps you build streaks, visualize progress, and achieve your goals 1% every day.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                <Link href="/login">
                  <Button className="h-12 px-8 rounded-full text-lg w-full sm:w-auto shadow-lg shadow-orange-500/20" size="lg">
                    Start Tracking Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline" className="h-12 px-8 rounded-full text-lg w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why HabitFlow?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that success isn't about massive action, but about small, consistent improvements.
                  HabitFlow is designed around the philosophy of <span className="font-semibold text-foreground">Atomic Habits</span>.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">Focus on the system, not just the goal.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">Make it obvious, attractive, easy, and satisfying.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">Never miss twice.</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 border shadow-2xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                <div className="text-center p-8 relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <div className="text-6xl font-bold text-orange-500 mb-2">1%</div>
                  <div className="text-2xl font-medium">Better Every Day</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits/Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything you need to succeed</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Powerful features packed into a simple, intuitive interface.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20 mb-2">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Streak Tracking</h3>
                <p className="text-muted-foreground">
                  Don't break the chain. Visualize your consistency with beautiful heatmaps and streak counters.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-2">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Smart Reminders</h3>
                <p className="text-muted-foreground">
                  Get notified at the exact right time. Snooze if you're busy, but never forget.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-2">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Gamified Progress</h3>
                <p className="text-muted-foreground">
                  Earn badges, level up, and unlock achievements as you build better habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Pricing</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Start for free, upgrade for superpowers.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Basic Plan */}
              <div className="flex flex-col p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-all relative overflow-hidden">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <p className="text-muted-foreground mt-2">Everything you need to build good habits.</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "Unlimited Habits",
                    "Streak Tracking",
                    "Basic Analytics",
                    "Daily Reminders",
                    "Gamification & Badges"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full">
                  <Button className="w-full h-12 rounded-xl text-lg" variant="outline">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  COMING SOON
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-gray-300 mt-2">Advanced tools for serious growth.</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">$5</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "AI Habit Coaching",
                    "Advanced Data Insights",
                    "Social Challenges",
                    "Multi-device Sync",
                    "Custom Themes & Icons",
                    "Priority Support"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-orange-400 shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-12 rounded-xl text-lg bg-orange-500 hover:bg-orange-600 text-white border-none" disabled>
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-16">Loved by Habit Builders</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "HabitFlow changed my life. The streak feature keeps me accountable every single day.",
                  author: "Sarah J.",
                  role: "Designer"
                },
                {
                  quote: "Simple, beautiful, and effective. Exactly what I needed to start reading more.",
                  author: "Mark T.",
                  role: "Developer"
                },
                {
                  quote: "The gamification makes building habits actually fun. I love leveling up!",
                  author: "Emily R.",
                  role: "Student"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-background p-8 rounded-2xl border shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to start your journey?</h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of others building better habits today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/login">
                  <Button size="lg" className="h-12 px-8 rounded-full text-lg shadow-lg shadow-primary/20">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="mailto:hello@habitflow.com">
                  <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-lg gap-2">
                    <Mail className="h-4 w-4" /> Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 bg-muted/50 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-xl">HabitFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building better habits, one day at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Download</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#about" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4 text-muted-foreground">
                <Link href="#" className="hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-foreground"><Github className="h-5 w-5" /></Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2025 HabitFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}