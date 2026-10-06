# How to Deploy your Secure Form to Vercel (100% Free)

By deploying with Vercel Serverless Functions, **your Google Webhook URL is completely hidden from the public and GitHub!**

---

## Step 1: Upload your folder to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `my-secure-form`.
2. Push or upload these 3 files/folders to your GitHub repository:
   - `public/index.html`
   - `api/submit.js`
   - `vercel.json`

---

## Step 2: Import into Vercel

1. Go to [Vercel.com](https://vercel.com) and log in (or sign up with GitHub).
2. Click **Add New...** -> **Project**.
3. Select your `my-secure-form` GitHub repository and click **Import**.

---

## Step 3: Add your Secret Environment Variable (IMPORTANT 🔒)

Before clicking Deploy, expand the **Environment Variables** section:

1. **Key:** `GOOGLE_WEBHOOK_URL`
2. **Value:** `https://script.google.com/macros/s/YOUR_ACTUAL_GOOGLE_WEBHOOK_ID/exec`
3. Click **Add**.

*(Optional Secret Token):*
- **Key:** `AUTH_SECRET`
- **Value:** `MySuperSecretKey998877`

---

## Step 4: Deploy & Test!

1. Click **Deploy**.
2. In about 20 seconds, Vercel will give you a live production link (e.g. `https://my-secure-form.vercel.app`).
3. Open the link, fill out the form text fields, and click **Submit Data**.
4. Check your Google Sheet — your data is automatically recorded, and your secret Google Webhook URL is **never exposed anywhere in the browser source code!** 🎉
