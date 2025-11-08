<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendGmailEmail($receiverEmail, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('GMAIL_USERNAME');
        $mail->Password   = getenv('GMAIL_APP_PASSWORD');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom(getenv('GMAIL_USERNAME'), 'Your Name');
        $mail->addAddress($receiverEmail);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        return ['success' => true, 'message' => 'Email sent successfully'];
    } catch (Exception $e) {
        return ['success' => false, 'message' => "Email could not be sent. Error: {$mail->ErrorInfo}"];
    }
}

if (php_sapi_name() === 'cli') {
    $receiverEmail = $argv[1] ?? 'recipient@example.com';
    $subject = $argv[2] ?? 'Test Email';
    $body = $argv[3] ?? '<h1>Hello!</h1><p>This is a test email from PHP.</p>';
    
    $result = sendGmailEmail($receiverEmail, $subject, $body);
    echo json_encode($result) . "\n";
}
