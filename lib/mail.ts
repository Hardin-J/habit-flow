import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

const getTemplate = (title: string, message: string, buttonText: string, link: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #fafafa; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: bold; color: #f97316; letter-spacing: -0.5px;">HabitFlow</span>
    </div>
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 16px 0; color: #ffffff;">${title}</h1>
      <p style="color: #a1a1aa; line-height: 1.6; margin: 0 0 32px 0; font-size: 16px;">${message}</p>
      <a href="${link}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: background-color 0.2s;">${buttonText}</a>
    </div>
    <div style="margin-top: 40px; text-align: center; color: #52525b; font-size: 12px;">
      <p style="margin: 0;">© ${new Date().getFullYear()} HabitFlow. All rights reserved.</p>
      <p style="margin: 8px 0 0 0;">Build better habits, one day at a time.</p>
    </div>
  </div>
</body>
</html>
`

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/verify-email?token=${token}`

  if (!process.env.EMAIL_SERVER_HOST) {
    console.log("👉 [Email Mock] Verification Link:", confirmLink)
    return
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "onboarding@habitflow.com",
    to: email,
    subject: "Welcome to HabitFlow! 🚀",
    html: getTemplate(
      "Verify your email",
      "Thanks for joining HabitFlow! We're excited to help you build better habits. Please verify your email address to get started.",
      "Verify Email",
      confirmLink
    ),
  })
}

export const sendReminderEmail = async (email: string, habitName: string) => {
  const dashboardLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`

  if (!process.env.EMAIL_SERVER_HOST) {
    console.log(`👉 [Email Mock] Reminder for "${habitName}" sent to ${email}`)
    return
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "reminders@habitflow.com",
    to: email,
    subject: `It's time for ${habitName}! ⏰`,
    html: getTemplate(
      "Time to check in!",
      `Don't let your streak break! It's time to complete <strong>${habitName}</strong>. You've got this!`,
      "Go to Dashboard",
      dashboardLink
    ),
  })
}