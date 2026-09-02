import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            gardenSize,
            gardenType,
            plantPreferences,
            budget,
            availability,
            serviceType,
            additionalInfo,
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !address || !availability || !serviceType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Configure email transporter
        // Using Gmail - you'll need to set up an app-specific password
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Format the email body
        const emailBody = `
New Garden Consultation Request

CLIENT INFORMATION:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Address: ${address}

GARDEN DETAILS:
Garden Size: ${gardenSize}
Garden Type (Light): ${gardenType}
Plant Preferences: ${plantPreferences || 'Not specified'}

PROJECT DETAILS:
Service Type: ${serviceType}
Budget Range: ${budget || 'Not specified'}
Desired Start Date: ${availability}

ADDITIONAL INFO:
${additionalInfo || 'None provided'}

---
This is an automated message from your website's contact form.
Respond to: ${email}
        `;

        // Send email to your business inbox
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'info@yourneighborsgardener.com',
            subject: `New Garden Request from ${firstName} ${lastName}`,
            text: emailBody,
            replyTo: email,
        });

        // Optional: Send confirmation email to customer
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'We Received Your Garden Request',
            text: `Hi ${firstName},\n\nThank you for contacting Your Neighbor's Gardener! We received your request and will be in touch within 24 hours.\n\nBest regards,\nYour Neighbor's Gardener`,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
