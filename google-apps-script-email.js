/**
 * Google Apps Script for Nirog Nature (Website Visits, Abandoned Address Leads, & Orders)
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet -> Extension -> Apps Script.
 * 2. Paste this code completely into Code.gs.
 * 3. Replace 'YOUR_EMAIL@gmail.com' on line 12 with your email address.
 * 4. Click 'Deploy' -> 'New deployment' -> Select type: 'Web app'.
 * 5. Set 'Execute as': 'Me', and 'Who has access': 'Anyone'.
 * 6. Click 'Deploy' and copy the Web App URL into your .env.local as GOOGLE_SHEETS_WEBHOOK_URL.
 */

var NOTIFICATION_EMAIL = "nirognature@gmail.com"; // Email where you will receive order alerts

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var type = data.type || (data.productName ? 'order' : 'visit');
    
    // ----------------------------------------------------
    // 1. WEBSITE VISIT NOTIFICATION
    // ----------------------------------------------------
    if (type === 'visit') {
      var visitSheet = sheet.getSheetByName("Visits") || sheet.insertSheet("Visits");
      if (visitSheet.getLastRow() === 0) {
        visitSheet.appendRow(["Timestamp", "IP Address", "Source", "User Agent"]);
      }
      visitSheet.appendRow([data.timestamp || new Date(), data.ip || 'N/A', data.referer || 'Direct', data.userAgent || 'N/A']);

      // Send Email Notification for Visit
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: "👀 New Website Visitor Alert - Nirog Nature",
        htmlBody: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #166534;">👀 नई वेबसाइट विज़िट (Website Visit)</h2>
            <p>आपकी वेबसाइट पर नया विज़िटर आया है!</p>
            <p><b>समय:</b> ${data.timestamp || new Date()}</p>
            <p><b>IP Address:</b> ${data.ip || 'Local'}</p>
            <p><b>स्रोत:</b> ${data.referer || 'Direct'}</p>
          </div>
        `
      });
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", type: "visit" })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ----------------------------------------------------
    // 2. ABANDONED ADDRESS LEAD NOTIFICATION
    // ----------------------------------------------------
    if (type === 'abandoned_lead') {
      var leadSheet = sheet.getSheetByName("Abandoned_Leads") || sheet.insertSheet("Abandoned_Leads");
      if (leadSheet.getLastRow() === 0) {
        leadSheet.appendRow(["Timestamp", "Product", "Full Name", "Mobile", "Address", "City", "Pincode", "Payment Option"]);
      }
      leadSheet.appendRow([
        data.timestamp || new Date(),
        data.productName || "निरोग नेचर नाग छत्री",
        data.fullName || "अधूरा",
        data.mobile || "अधूरा",
        data.address || "अधूरा",
        data.city || "N/A",
        data.pincode || "N/A",
        data.paymentOption || "Not Selected"
      ]);

      // Send Instant Email Alert for Abandoned Address
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: "⚠️ ABANDONED ADDRESS LEAD: " + (data.fullName || "अज्ञात") + " (" + (data.mobile || "नंबर नहीं") + ")",
        htmlBody: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fef2f2;">
            <div style="max-width: 550px; background: #ffffff; padding: 20px; border-top: 4px solid #dc2626; border-radius: 8px;">
              <h2 style="color: #dc2626;">⚠️ अधूरा एड्रेस भर कर जाने वाला ग्राहक (Abandoned Lead)</h2>
              <p>एक ग्राहक ने एड्रेस भर दिया पर बिना ऑर्डर पक्का किए चला गया!</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td><b>उत्पाद:</b></td><td>${data.productName || 'निरोग नेचर नाग छत्री'}</td></tr>
                <tr><td><b>नाम:</b></td><td>${data.fullName || 'अधूरा'}</td></tr>
                <tr><td><b>मोबाइल:</b></td><td><a href="tel:${data.mobile}">${data.mobile || 'अधूरा'}</a></td></tr>
                <tr><td><b>पता:</b></td><td>${data.address || 'अधूरा'}</td></tr>
                <tr><td><b>शहर / पिन:</b></td><td>${data.city || ''} ${data.pincode || ''}</td></tr>
                <tr><td><b>समय:</b></td><td>${data.timestamp || new Date()}</td></tr>
              </table>
              <p style="margin-top: 15px; color: #92400e; font-weight: bold; background: #fef3c7; padding: 10px; border-radius: 5px;">
                💡 इस ग्राहक को कॉल करके या WhatsApp पर मैसेज करके तुरंत फॉलो-अप लें।
              </p>
            </div>
          </div>
        `
      });

      return ContentService.createTextOutput(JSON.stringify({ status: "success", type: "abandoned_lead" })).setMimeType(ContentService.MimeType.JSON);
    }

    // ----------------------------------------------------
    // 3. COMPLETED ORDER NOTIFICATION
    // ----------------------------------------------------
    var orderSheet = sheet.getSheetByName("Orders") || sheet.insertSheet("Orders");
    if (orderSheet.getLastRow() === 0) {
      orderSheet.appendRow(["Timestamp", "Product", "Full Name", "Mobile", "Address", "City", "Pincode", "Payment Option", "Amount"]);
    }
    orderSheet.appendRow([
      data.timestamp || new Date(),
      data.productName || "निरोग नेचर नाग छत्री",
      data.fullName,
      data.mobile,
      data.address,
      data.city,
      data.pincode,
      data.paymentOption,
      data.amount
    ]);

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "🎉 NEW ORDER: ₹" + data.amount + " - " + data.fullName,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0fdf4;">
          <div style="max-width: 550px; background: #ffffff; padding: 20px; border-top: 4px solid #166534; border-radius: 8px;">
            <h2 style="color: #166534;">🎉 नया ऑर्डर पक्का हुआ! (Confirmed Order)</h2>
            <p><b>उत्पाद:</b> ${data.productName || 'निरोग नेचर नाग छत्री'}</p>
            <p><b>नाम:</b> ${data.fullName}</p>
            <p><b>मोबाइल:</b> <a href="tel:${data.mobile}">${data.mobile}</a></p>
            <p><b>पता:</b> ${data.address}, ${data.city} - ${data.pincode}</p>
            <p><b>पेमेंट विधि:</b> ${data.paymentOption === 'advance' ? 'Pay Advance (₹100 ऑनलाइन प्राप्त)' : data.paymentOption === 'full' ? 'पूरा ऑनलाइन भुगतान (Full Payment)' : 'कैश ऑन डिलीवरी (COD)'}</p>
            <p><b>कुल आर्डर राशि:</b> ₹${data.amount}</p>
            ${data.paymentOption === 'advance' ? `<p style="color: #15803d; font-weight: bold;">प्राप्त एडवांस: ₹100</p><p style="color: #b45309; font-weight: bold;">डिलीवरी पर देय शेष राशि (COD): ₹${data.amount - 100}</p>` : ''}
          </div>
        </div>
      `
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", type: "order" })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
