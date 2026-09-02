# Your Neighbor's Gardener - Contact Form Deployment Guide

## Files You Have

- `index.html` - The contact form (frontend)
- `api/send-email.js` - Email backend
- `package.json` - Dependencies
- `vercel.json` - Vercel configuration

## Step-by-Step Deployment

### 1. Create Gmail App Password (5 min)

Since we're using Gmail to send emails:

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not already enabled
3. Go back to Security → App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Save it (you'll need it next)

### 2. Deploy to Vercel (2 min)

1. Go to https://vercel.com/sign-up
2. Sign up with GitHub (or your preferred method)
3. Click "New Project"
4. Import the project folder with these files
5. Configure environment variables:
   - `GMAIL_USER`: your-gmail@gmail.com
   - `GMAIL_PASS`: (the 16-character password from step 1)
6. Click Deploy

**Vercel will give you a URL like: `https://yourneighborsgardener-abc123.vercel.app`**

### 3. Update Your Website

Add this to your WordPress site's contact page:

```html
<iframe src="https://yourneighborsgardener-abc123.vercel.app" 
        width="100%" 
        height="1200" 
        style="border:none; border-radius:10px;"></iframe>
```

Or better: Link to the form directly:
```html
<a href="https://yourneighborsgardener-abc123.vercel.app" class="button">
  Get a Free Consultation
</a>
```

### 4. Test It

1. Go to your Vercel URL
2. Fill out the form
3. Should receive email at info@yourneighborsgardener.com

## What Happens When Someone Submits

1. ✓ Form sends data to Vercel API
2. ✓ Vercel sends email to info@yourneighborsgardener.com with all details
3. ✓ Customer gets confirmation email
4. ✓ Success message shows on form

## Environment Variables Needed

- `GMAIL_USER`: Gmail address (must enable 2FA + create app password)
- `GMAIL_PASS`: 16-character app-specific password (NOT your regular password)

## Troubleshooting

**Email not sending?**
- Check GMAIL_USER and GMAIL_PASS in Vercel dashboard
- Verify 2FA is enabled on Gmail
- Verify app-specific password is correct

**Form not submitting?**
- Check browser console (F12) for errors
- Verify Vercel deployment was successful
- Check that GMAIL credentials are set in Vercel

**Need help with Gmail?**
- https://support.google.com/accounts/answer/185833

## Custom Domain (Optional)

To use yourneighborsgardener.com/contact instead of vercel.com URL:

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS records (Vercel will provide instructions)

## Summary

Total time to deploy: ~10 minutes
- Gmail setup: 5 min
- Vercel deploy: 2 min
- Testing: 3 min

You're done!
