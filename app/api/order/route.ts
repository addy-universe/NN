import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, mobile, address, city, state, pincode, paymentOption, amount, paymentDetails, productName } = body;

    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // 1. Forward completed order to Google Sheets Webhook
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'order', ...body, timestamp }),
      }).catch(err => console.error('Order Webhook Error:', err));
    }

    // 2. Send instant email notification for completed order
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0fdf4;">
        <div style="max-width: 550px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 12px; border-top: 4px solid #15803d; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #15803d; margin-top: 0;">🎉 नया ऑर्डर मिला! (New Order Placed)</h2>
          <p style="color: #4b5563; font-size: 14px;">बधाई हो! आपकी वेबसाइट से एक नया ऑर्डर प्राप्त हुआ है।</p>
          <hr style="border: 0; border-top: 1px solid #dcfce7; margin: 15px 0;" />
          
          <table style="width: 100%; font-size: 14px; color: #1f2937; border-collapse: collapse;">
            <tr style="background-color: #f9fafb;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">उत्पाद:</td><td style="padding: 8px; font-weight: bold; color: #15803d;">${productName || 'निरोग नेचर ऊर्जा मैक्स गोल्ड'}</td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">ग्राहक का नाम:</td><td style="padding: 8px; font-weight: bold;">${fullName}</td></tr>
            <tr style="background-color: #f9fafb;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">मोबाइल:</td><td style="padding: 8px; font-weight: bold; color: #047857;"><a href="tel:${mobile}" style="color: #047857;">${mobile}</a></td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">पूरा पता:</td><td style="padding: 8px;">${address}</td></tr>
            <tr style="background-color: #f9fafb;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">शहर / राज्य / पिन:</td><td style="padding: 8px;">${city}, ${state || ''} - ${pincode}</td></tr>
            <tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">पेमेंट विधि:</td><td style="padding: 8px; font-weight: bold;">${paymentOption === 'full' ? 'पूरा ऑनलाइन भुगतान' : paymentOption === 'advance' ? 'एडवांस ऑनलाइन भुगतान' : 'कैश ऑन डिलीवरी (COD)'}</td></tr>
            <tr style="background-color: #f9fafb;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">राशि (Amount):</td><td style="padding: 8px; font-weight: bold; color: #d97706; font-size: 16px;">₹${amount}</td></tr>
            ${paymentDetails ? `<tr><td style="padding: 8px; color: #6b7280; font-weight: bold;">Razorpay Payment ID:</td><td style="padding: 8px; font-size: 12px; font-family: monospace;">${paymentDetails.paymentId || 'N/A'}</td></tr>` : ''}
            <tr style="background-color: #f9fafb;"><td style="padding: 8px; color: #6b7280; font-weight: bold;">समय (Timestamp):</td><td style="padding: 8px;">${timestamp}</td></tr>
          </table>
        </div>
      </div>
    `;

    await sendEmail({
      subject: `🎉 CONFIRMED ORDER: ₹${amount} - ${fullName} (${mobile})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json({ success: false, error: 'Order processing failed' }, { status: 500 });
  }
}
