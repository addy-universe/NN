import nodemailer from 'nodemailer';

interface EmailData {
  to?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailData) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || 'nirognature@gmail.com';
  const smtpPass = process.env.SMTP_PASS || '';
  const notificationEmail = to || process.env.NOTIFICATION_EMAIL || 'nirognature@gmail.com';

  // 1. If Webhook is configured, forward payload to Webhook
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          notificationEmail,
          html,
          text,
          date: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Webhook Email Forwarding Error:', err);
    }
  }

  // 2. If SMTP credentials are provided, send email directly via Nodemailer
  if (smtpUser && smtpPass && notificationEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Nirog Nature Notifications" <${smtpUser}>`,
        to: notificationEmail,
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ''),
      });

      console.log(`Email successfully sent to ${notificationEmail}: ${subject}`);
      return { success: true };
    } catch (error) {
      console.error('Nodemailer Error:', error);
      return { success: false, error };
    }
  }

  return { success: true, note: 'Webhook or SMTP logged' };
}
