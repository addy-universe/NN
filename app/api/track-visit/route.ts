import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get('user-agent') || 'Unknown Device';
    const referer = req.headers.get('referer') || 'Direct Visit';
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'Local / Hidden IP';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

    // Send payload to Google Sheets Webhook if configured
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          ip,
          userAgent,
          referer,
          timestamp,
          ...body
        })
      }).catch(err => console.error('Visit Webhook Error:', err));
    }

    // Send email alert for website visitor
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 25px; rounded-radius: 12px; border-top: 4px solid #166534; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #166534; margin-top: 0;">👀 नई वेबसाइट विज़िट (New Visitor Alert)</h2>
          <p style="color: #4b5563; font-size: 14px;">आपकी वेबसाइट <strong>Nirog Nature</strong> पर नया विज़िटर आया है!</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;" />
          <table style="width: 100%; font-size: 14px; color: #1f2937;">
            <tr><td style="padding: 6px 0; color: #6b7280;">समय (Time):</td><td style="font-weight: bold;">${timestamp}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">IP पते (IP):</td><td style="font-weight: bold;">${ip}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">स्रोत (Source/Referer):</td><td>${referer}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">डिवाइस (Device):</td><td style="font-size: 12px; word-break: break-all;">${userAgent}</td></tr>
          </table>
        </div>
      </div>
    `;

    await sendEmail({
      subject: `👀 नई विज़िट ALERT - Nirgog Nature Website`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track Visit Error:', error);
    return NextResponse.json({ success: false, error: 'Tracking failed' }, { status: 500 });
  }
}
