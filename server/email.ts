import nodemailer from "nodemailer";
import type { ContactFormData } from "@shared/schema";

export async function sendContactEmail(data: ContactFormData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const purposeLabels: Record<ContactFormData["purpose"], string> = {
    "weight-loss": "Overall Weight Loss",
    "body-toning": "Body Toning",
    "postpartum": "Reducing Postpartum Belly Fat",
    "strength-building": "Build Strength/Endurance/Flexibility",
    "general-fitness": "General Fitness",
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
          }
          .header {
            background: linear-gradient(135deg, #c026d3 0%, #db2777 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
            color: #c026d3;
            margin-bottom: 5px;
          }
          .value {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #c026d3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Bliss & Burn Fitness Program</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Contact Number:</div>
              <div class="value">${data.contactNumber}</div>
            </div>
            <div class="field">
              <div class="label">Purpose:</div>
              <div class="value">${purposeLabels[data.purpose]}</div>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
            <p style="color: #666; font-size: 14px;">
              This is an automated message from your Bliss & Burn website contact form.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"Bliss & Burn Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Contact Form: ${data.name} - ${purposeLabels[data.purpose]}`,
    html: htmlContent,
    text: `
New Contact Form Submission - Bliss & Burn

Name: ${data.name}
Email: ${data.email}
Contact Number: ${data.contactNumber}
Purpose: ${purposeLabels[data.purpose]}

This is an automated message from your Bliss & Burn website contact form.
    `.trim(),
  };

  await transporter.sendMail(mailOptions);
}
