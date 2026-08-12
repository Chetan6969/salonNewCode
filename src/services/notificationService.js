/**
 * Notification Service for He & She Hair Fix Unisex Salon
 * 
 * Routes booking notifications through the secure Node.js Express backend.
 * Gracefully falls back to local simulation if the backend server is unreachable.
 */

const CONFIG_KEY = 'heandshe_notification_config';

export const getNotificationConfig = () => {
  const saved = localStorage.getItem(CONFIG_KEY);
  return saved ? JSON.parse(saved) : {
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    customWebhookUrl: '',
    notificationsEnabled: false
  };
};

export const saveNotificationConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const sendBookingNotifications = async (bookingDetails) => {
  let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/booking-notification';
  
  // If accessed over Wi-Fi/local network, dynamically map API calls to host IP instead of localhost
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    apiUrl = apiUrl.replace('localhost', window.location.hostname).replace('127.0.0.1', window.location.hostname);
  }

  const salonEmail = import.meta.env.VITE_SALON_EMAIL || 'heandshehairfixsalon@gmail.com';
  
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: bookingDetails.clientName,
        clientEmail: bookingDetails.clientEmail,
        clientPhone: bookingDetails.clientPhone,
        bookingRef: bookingDetails.bookingRef,
        bookingDate: bookingDetails.bookingDate,
        bookingTime: bookingDetails.bookingTime,
        stylist: bookingDetails.stylist,
        services: bookingDetails.services,
        grandTotal: bookingDetails.grandTotal
      })
    });
    
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const text = await res.text();
      return {
        success: false,
        isSimulated: true,
        logs: [
          { type: 'email', status: 'error', message: `Server error ${res.status}: ${text}` },
          { type: 'sms', status: 'error', message: `Server failed to route notifications.` }
        ],
        summary: {
          emailSentTo: salonEmail,
          smsSentTo: bookingDetails.clientPhone,
          messagePreview: `Connection to backend failed.`
        }
      };
    }
  } catch (err) {
    console.warn("Backend server offline. Running in local standalone simulated mode.", err.message);
    
    const smsBody = `Booking Confirmed! Dear ${bookingDetails.clientName}, your appointment at He & She Salon is locked for ${bookingDetails.bookingDate} at ${bookingDetails.bookingTime} with ${bookingDetails.stylist}. Ref: ${bookingDetails.bookingRef}. Total: ₹${bookingDetails.grandTotal}.`;
    
    return {
      success: true,
      isSimulated: true,
      logs: [
        { type: 'email', status: 'simulated', message: `[Simulated Standalone Email] Sent to ${salonEmail}: Booking Ref ${bookingDetails.bookingRef} confirmed.` },
        { type: 'sms', status: 'simulated', message: `[Simulated Standalone SMS] Sent to client at ${bookingDetails.clientPhone}: ${smsBody}` }
      ],
      summary: {
        emailSentTo: salonEmail,
        smsSentTo: bookingDetails.clientPhone,
        messagePreview: smsBody
      }
    };
  }
};
