// ============================================================================
// Vercel Serverless Function: api/submit.js
// Hides your secret Google Webhook URL from the public and GitHub!
// ============================================================================

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Fetch the Secret Google Webhook URL from Environment Variables
  const GOOGLE_WEBHOOK_URL = process.env.GOOGLE_WEBHOOK_URL;
  const AUTH_SECRET = process.env.AUTH_SECRET || "DefaultSecretKey123";

  if (!GOOGLE_WEBHOOK_URL) {
    console.error("GOOGLE_WEBHOOK_URL is missing in Vercel Environment Variables!");
    return res.status(500).json({ 
      error: "GOOGLE_WEBHOOK_URL environment variable is missing on Vercel." 
    });
  }

  try {
    const formData = req.body || {};
    formData.auth_token = AUTH_SECRET;

    // 3. Forward form data to Google Apps Script
    const googleResponse = await fetch(GOOGLE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      redirect: 'follow'
    });

    const textResponse = await googleResponse.text();
    let parsedResult;

    try {
      parsedResult = JSON.parse(textResponse);
    } catch (e) {
      parsedResult = { rawResponse: textResponse };
    }

    return res.status(200).json({ success: true, result: parsedResult });
  } catch (error) {
    console.error("Error forwarding to Google Webhook:", error);
    return res.status(500).json({ 
      error: "Failed to forward request to Google Webhook", 
      details: error.message 
    });
  }
}
