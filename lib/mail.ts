import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendReminderEmail(to: string, habitTitle: string) {
  try {
    await transporter.sendMail({
      from: `"<${process.env.EMAIL_FROM_NAME}>" <${process.env.EMAIL_FROM}>`,
      to,
      subject: `⏰ Reminder: ${habitTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Time to build your habit!</h2>
          <p>You set a reminder for <strong>${habitTitle}</strong>.</p>
          <p>Don't break your streak. Log in now to mark it complete.</p>
          <a href="${process.env.AUTH_URL}/dashboard" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </div>
      `,
    })
    console.log(`📧 Email sent to ${to} for ${habitTitle}`)
  } catch (error) {
    console.error("Email failed:", error)
  }
}