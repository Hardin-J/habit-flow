import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner" // Import this
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HabitFlow",
  description: "Track your habits, build your future.",
};

import { MouseFollower } from "@/components/ui/mouse-follower"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Y2YUTh9rMS0sHvNDmLwd69aLTbiw2QxWEixQyo0tcyA" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MouseFollower />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
