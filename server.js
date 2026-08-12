import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Configure CORS to allow frontend access
app.use(cors({
  origin: '*' // Allow all origins for local/testing. Can narrow down to specific domain later.
}));
app.use(express.json());

// 1. Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : ''
  }
});

// Verify SMTP connection config
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer SMTP Connection Error:', error);
  } else {
    console.log('Nodemailer SMTP Connection Ready.');
  }
});

// 2. Initialize Twilio Client
let twilioClient = null;
const isTwilioConfigured = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER;

if (isTwilioConfigured) {
  try {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('Twilio Client initialized successfully.');
  } catch (err) {
    console.error('Error initializing Twilio Client:', err.message);
  }
} else {
  console.log('Twilio credentials not fully set. SMS will run in Simulated Mode.');
}

// 3. API Booking Endpoint
app.post('/api/booking-notification', async (req, res) => {
  const {
    clientName,
    clientEmail,
    clientPhone,
    bookingRef,
    bookingDate,
    bookingTime,
    stylist,
    services,
    grandTotal
  } = req.body;

  const logs = [];
  const servicesText = services.map(s => s.name).join(', ');

  // A. Process Email Delivery (to salon & customer separately)
  let emailStatus = 'simulated';
  let emailMsg = '';

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // 1. Compile Salon Admin Alert HTML
    const adminHtmlBody = `
      <div style="font-family: sans-serif; background-color: #121214; color: #f5f5f7; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
        <div style="text-align: center; border-bottom: 1px dashed #333; padding-bottom: 20px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; font-family: serif; letter-spacing: 0.15em; margin: 0;">HE & SHE HAIRFIX</h2>
          <span style="font-size: 10px; color: #a0a0a0; tracking: 0.25em;">NEW APPOINTMENT ALERT</span>
        </div>
        <p style="font-size: 14px; color: #a0a0a0; line-height: 1.6;">
          Hello Team, a new unisex grooming appointment has been booked. Details are compiled below:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold; width: 40%;">BOOKING REF:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${bookingRef}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">CLIENT NAME:</td>
            <td style="padding: 8px 0; color: #ffffff;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">CLIENT PHONE:</td>
            <td style="padding: 8px 0; color: #ffffff;">${clientPhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">CLIENT EMAIL:</td>
            <td style="padding: 8px 0; color: #ffffff;">${clientEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">DATE & TIME:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${bookingDate} @ ${bookingTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">STYLIST:</td>
            <td style="padding: 8px 0; color: #ffffff;">${stylist}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666; font-weight: bold;">SERVICES:</td>
            <td style="padding: 8px 0; color: #ffffff;">${servicesText}</td>
          </tr>
          <tr style="border-top: 1px solid #222;">
            <td style="padding: 12px 0 8px 0; color: #a0a0a0; font-weight: bold;">TOTAL BILL:</td>
            <td style="padding: 12px 0 8px 0; color: #ffffff; font-weight: bold; font-size: 15px;">₹${grandTotal}</td>
          </tr>
        </table>
        <div style="text-align: center; border-top: 1px solid #222; padding-top: 15px; font-size: 11px; color: #555;">
          This is an automated notification. Please make sure the stylist is ready at the scheduled hour.
        </div>
      </div>
    `;

    // 2. Compile Customer Receipt HTML
    const clientHtmlBody = `
      <div style="font-family: sans-serif; background-color: #121214; color: #f5f5f7; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
        <div style="text-align: center; border-bottom: 1px dashed #333; padding-bottom: 20px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; font-family: serif; letter-spacing: 0.15em; margin: 0;">HE & SHE HAIRFIX</h2>
          <span style="font-size: 10px; color: #a0a0a0; tracking: 0.25em;">OFFICIAL BOOKING CONFIRMATION</span>
        </div>
        <p style="font-size: 14px; color: #ffffff; font-weight: 500;">
          Dear ${clientName},
        </p>
        <p style="font-size: 13px; color: #a0a0a0; line-height: 1.6;">
          Your unisex grooming session has been successfully locked. Below are your booking ticket details:
        </p>
        <div style="background-color: #1c1c1f; border: 1px solid #2a2a30; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #f5f5f7;">
            <tr>
              <td style="padding: 6px 0; color: #666666; font-weight: bold; width: 35%;">BOOKING REF:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${bookingRef}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666666; font-weight: bold;">DATE & TIME:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${bookingDate} @ ${bookingTime}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666666; font-weight: bold;">STYLIST:</td>
              <td style="padding: 6px 0; color: #ffffff;">${stylist}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666666; font-weight: bold;">SERVICES:</td>
              <td style="padding: 6px 0; color: #ffffff;">${servicesText}</td>
            </tr>
            <tr style="border-top: 1px solid #333;">
              <td style="padding: 10px 0 0 0; color: #a0a0a0; font-weight: bold;">TOTAL BILL:</td>
              <td style="padding: 10px 0 0 0; color: #10b981; font-weight: bold; font-size: 15px;">₹${grandTotal}</td>
            </tr>
          </table>
        </div>
        <div style="border-top: 1px solid #222; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #8e8e93; line-height: 1.5;">
          <strong style="color: #ffffff;">HE & SHE HAIRFIX UNISEX SALON</strong><br />
          📍 HIG 16 Bharhut Nagar Satna, Madhya Pradesh, 485441<br />
          📞 Call: +91 6266979583<br />
          ✉️ Support: ${process.env.EMAIL_USER}
        </div>
        <p style="font-size: 11px; color: #555; text-align: center; margin-top: 25px; border-top: 1px dashed #222; padding-top: 10px;">
          Please show this digital confirmation ticket at the reception desk on arrival. We look forward to grooming you!
        </p>
      </div>
    `;

    try {
      // Dispatch 1: To Salon Admin (copy to themselves)
      const adminMailPromise = transporter.sendMail({
        from: `"He & She Salon Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[New Booking Alert] Ref: ${bookingRef} - ${clientName}`,
        html: adminHtmlBody
      });

      // Dispatch 2: To Customer (direct recipient)
      let clientMailPromise = Promise.resolve();
      if (clientEmail && clientEmail.includes('@')) {
        clientMailPromise = transporter.sendMail({
          from: `"He & She Hairfix" <${process.env.EMAIL_USER}>`,
          to: clientEmail,
          subject: `Booking Confirmed! Ref: ${bookingRef} (He & She Hairfix)`,
          html: clientHtmlBody
        });
      }

      // Execute concurrently
      await Promise.all([adminMailPromise, clientMailPromise]);
      
      emailStatus = 'success';
      emailMsg = `Emails successfully dispatched to both Salon (${process.env.EMAIL_USER}) and Customer (${clientEmail || 'N/A'})`;
      console.log(emailMsg);
    } catch (err) {
      emailStatus = 'error';
      emailMsg = `Nodemailer dispatch failed: ${err.message}`;
      console.error(emailMsg);
    }
  } else {
    emailMsg = `[Simulated Nodemailer Email] Staging credentials not fully defined. Custom receipts would dispatch to both Admin and Client.`;
    console.log(emailMsg);
  }
  logs.push({ type: 'email', status: emailStatus, message: emailMsg });

  // B. Process SMS Delivery
  let smsStatus = 'simulated';
  let smsMsg = '';
  const smsBody = `Booking Confirmed! Dear ${clientName}, your appointment at He & She Salon is locked for ${bookingDate} at ${bookingTime} with ${stylist}. Ref: ${bookingRef}. Total: ₹${grandTotal}.`;

  if (isTwilioConfigured && twilioClient) {
    try {
      const message = await twilioClient.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: clientPhone
      });
      smsStatus = 'success';
      smsMsg = `Twilio sent SMS successfully to client at ${clientPhone}. Message SID: ${message.sid}`;
      console.log(smsMsg);
    } catch (err) {
      smsStatus = 'error';
      smsMsg = `Twilio failed to dispatch SMS: ${err.message}`;
      console.error(smsMsg);
    }
  } else {
    // TIP: For Indian SMS gateways like Fast2SMS, you can replace this with a simple fetch request:
    // const fast2smsKey = process.env.FAST2SMS_API_KEY;
    // try {
    //   const response = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsKey}&route=q&message=${encodeURIComponent(smsBody)}&flash=0&numbers=${clientPhone}`);
    //   const data = await response.json();
    //   if (data.return) { smsStatus = 'success'; smsMsg = 'SMS sent via Fast2SMS!'; }
    //   else { smsStatus = 'error'; smsMsg = data.message; }
    // } catch(e) { smsStatus = 'error'; smsMsg = e.message; }

    smsMsg = `[Simulated Twilio SMS] Sent to client at ${clientPhone}: ${smsBody}`;
    console.log(smsMsg);
  }
  logs.push({ type: 'sms', status: smsStatus, message: smsMsg });

  // Return responses
  res.json({
    success: emailStatus === 'success' || smsStatus === 'success',
    isSimulated: emailStatus === 'simulated' && smsStatus === 'simulated',
    logs,
    summary: {
      emailSentTo: process.env.EMAIL_USER || 'heandshehairfixsalon@gmail.com',
      smsSentTo: clientPhone,
      messagePreview: smsBody
    }
  });
});

// Start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend notification server running on port ${PORT}`);
});
