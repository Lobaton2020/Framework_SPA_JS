<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require_once "../app/libs/phpmailer/Exception.php";
require_once "../app/libs/phpmailer/SMTP.php";
require_once "../app/libs/phpmailer/PHPMailer.php";
require_once "../app/config/config.php";
try {
    $mail = new PHPMailer();
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host       = SMTPHOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTPUSER;
    $mail->Password   = SMTPASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTPPORT;

    $mail->setFrom('FROM', 'Mailer');
    $mail->AddAddress("DESTINNER");

    $mail->isHTML(true);
    $mail->Subject = "first mailing";
    $mail->Body = "hi ! \n\n this is First mailing I made
    myself with phpMailer !";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if (!$mail->Send()) {
        echo "Message was not sent";
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message has been sent";
    }
} catch (Exception $e) {
    exit($e->getMessage());
}
