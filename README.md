# HabitFlow

HabitFlow is a modern, gamified habit tracker designed to help you build habits that stick. With features like streak tracking, smart reminders, and a beautiful, distraction-free interface, it's your personal companion for self-improvement.

![HabitFlow Hero](public/manifest-icon-512.png)

## Features

-   **Streak Tracking**: Visualize your consistency with heatmaps and streak counters.
-   **Smart Reminders**: Get notified at the right time with customizable reminders and snooze functionality.
-   **Gamification**: Earn badges and level up as you complete your habits.
-   **PWA Support**: Installable on mobile devices for a native app-like experience.
-   **Dark Mode**: Fully supported dark theme for late-night tracking.
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon DB](https://neon.tech/))
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google & GitHub)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
-   **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or pnpm
-   A Neon DB account (for PostgreSQL)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/habit-flow.git
    cd habit-flow
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://user:password@ep-your-endpoint.us-east-2.aws.neon.tech/neondb?sslmode=require"
    AUTH_SECRET="your-secret-key" # Generate with `npx auth secret`
    AUTH_GOOGLE_ID="your-google-client-id"
    AUTH_GOOGLE_SECRET="your-google-client-secret"
    AUTH_GITHUB_ID="your-github-client-id"
    AUTH_GITHUB_SECRET="your-github-client-secret"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Push the database schema:**

    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables (DATABASE_URL, AUTH_SECRET, etc.) in the Vercel project settings.
4.  Deploy!

### Database (Neon DB)

Ensure your Neon DB project is set up and the connection string is correctly added to your Vercel environment variables. Prisma will handle the connection pooling automatically.

## License

This project is licensed under the MIT License.
