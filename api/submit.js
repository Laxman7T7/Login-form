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
    console.error("GOOGLE_WEBHOOK_URL is not configured in Vercel Environment Variables");
    return res.status(500).json({ error: "Server configuration error: GOOGLE_WEBHOOK_URL missing" });
  }

  try {
    const formData = req.body;

    // Attach secret server-side token
    formData.auth_token = AUTH_SECRET;

    // 3. Forward the form data to Google Apps Script safely from the server
    const googleResponse = await fetch(GOOGLE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await googleResponse.json();

    // 4. Return success to the frontend
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error forwarding to Google Webhook:", error);
    return res.status(500).json({ error: "Failed to submit form to storage" });
  }
}
