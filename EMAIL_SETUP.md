# Gmail Email Setup Guide

This project includes a PHP script to send emails via Gmail SMTP.

## Setup Instructions

### 1. Create a Gmail App Password

Since Gmail requires app-specific passwords for third-party apps:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Under "2-Step Verification", find **App passwords**
5. Create a new app password for "Mail"
6. Copy the 16-character password

### 2. Add Secrets to Replit

You need to add two environment variables:

1. Click the **Secrets** tab in Replit (lock icon in the sidebar)
2. Add the following secrets:
   - **GMAIL_USERNAME**: Your full Gmail address (e.g., yourname@gmail.com)
   - **GMAIL_APP_PASSWORD**: The 16-character app password from step 1

### 3. Usage

#### From Command Line:
```bash
php send_email.php "recipient@example.com" "Subject Line" "Email body content"
```

#### From Your Code:
```php
require 'send_email.php';

$result = sendGmailEmail(
    'recipient@example.com',
    'Subject Line',
    '<h1>Hello!</h1><p>Your email content here</p>'
);

if ($result['success']) {
    echo "Email sent!";
} else {
    echo "Error: " . $result['message'];
}
```

## Changing the Receiver Email

To change the receiver email, simply modify the first parameter when calling the function:

```php
sendGmailEmail('newemail@example.com', 'Subject', 'Body');
```

Or from command line:
```bash
php send_email.php "newemail@example.com" "Subject" "Body"
```

## Security Notes

- Never commit your Gmail password or app password to version control
- Always use environment variables via Replit Secrets
- The app password is different from your regular Gmail password
- You can revoke app passwords anytime from your Google Account settings
