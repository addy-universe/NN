import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, mobile, address, city, pincode, paymentOption, productName } = body;

    // Must have at least name or mobile to qualify as lead
    if (!fullName && !mobile && !address) {
      return NextResponse.json({ success: false, message: 'Insufficient lead data' });
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

    // Forward abandoned lead data to Google Sheets Webhook
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'abandoned_lead',
          productName: productName || 'निरोग नेचर नाग छत्री',
          fullName: fullName || 'N/A',
          mobile: mobile || 'N/A',
          address: address || 'N/A',
          city: city || 'N/A',
          pincode: pincode || 'N/A',
          paymentOption: paymentOption || 'Not selected',
          timestamp,
        })
      }).catch(err => console.error('Abandoned Lead Webhook Error:', err));
    }

    // Send email alert for abandoned lead / address entry
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fef2f2;">
        <div style="max-width: 550px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 12px; border-top: 4px solid #dc2626; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #dc2626; margin-top: 0;">⚠️ अधूरा एड्रेस ALERT (Abandoned Address Lead)</h2>
          <p style="color: #4b5563; font-size: 14px;">ग्राहक ने एड्रेस भर दिया था पर ऑर्डर पूरा किए बिना वापस चला गया!</p>
          <hr style="border: 0; border-top: 1px solid #fee2e2; margin: 15px 0;" />
          
          <table style="width: 100%; font-size: 14px; color: #1f2937; border-collapse: collapse;">
            <tr style="background-color: #fcfcfc;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">उत्पाद:</td><td style="padding: 8px; font-weight: bold; color: #166534;">${productName || 'निरोग नेचर नाग छत्री'}</td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">नाम (Name):</td><td style="padding: 8px; font-weight: bold; color: #111827;">${fullName || 'अधूरा'}</td></tr>
            <tr style="background-color: #fcfcfc;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">मोबाइल (Mobile):</td><td style="padding: 8px; font-weight: bold; color: #b91c1c;"><a href="tel:${mobile}" style="color: #b91c1c; text-decoration: underline;">${mobile || 'अधूरा'}</a></td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">पूरा पता (Address):</td><td style="padding: 8px;">${address || 'अधूरा'}</td></tr>
            <tr style="background-color: #fcfcfc;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">शहर (City):</td><td style="padding: 8px;">${city || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">पिन कोड (Pincode):</td><td style="padding: 8px;">${pincode || 'N/A'}</td></tr>
            <tr style="background-color: #fcfcfc;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">समय (Timestamp):</td><td style="padding: 8px;">${timestamp}</td></tr>
          </table>

          <div style="margin-top: 20px; background-color: #fef3c7; border: 1px solid #f59e0b; padding: 12px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: bold;">💡 तुरंत फॉलो-अप करें! इस ग्राहक का नंबर पर call या WhatsApp करके ऑर्डर कन्फर्म करवाएं।</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      subject: `⚠️ Abandoned Address Lead: ${fullName || 'ग्राहक'} (${mobile || 'नंबर नहीं'})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Abandoned Lead Error:', error);
    return NextResponse.json({ success: false, error: 'Processing failed' }, { status: 500 });
  }
}
