<?php
/**
 * Form endpoint for the contact section, the contact popup and the newsletter.
 *
 * Sends through Hostinger SMTP, authenticated as the site mailbox, so the
 * message passes SPF/DKIM/DMARC for wynextechnologies.com and lands in the
 * inbox rather than spam. The visitor's address goes in Reply-To, never From.
 *
 * mail-config.php (written at deploy time from the SMTP_PASSWORD GitHub secret,
 * never committed) must return: ['smtp_password' => '…'] and may override
 * smtp_host, smtp_port, smtp_user and to.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

const SITE_MAILBOX = 'info@wynextechnologies.com';
const ALLOWED_ORIGINS = ['https://wynextechnologies.com', 'https://www.wynextechnologies.com'];
const RATE_LIMIT = 5;          // submissions…
const RATE_WINDOW = 600;       // …per IP per 10 minutes
const MIN_FILL_SECONDS = 3;    // humans don't fill a form faster than this

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

// Bots get the same reply as a real success so they can't tell they were filtered.
function quietly_drop(string $why): void
{
    error_log("contact.php: dropped submission ($why)");
    respond(200, ['ok' => true]);
}

function field(array $data, string $key, int $max): string
{
    $value = isset($data[$key]) && is_scalar($data[$key]) ? trim((string) $data[$key]) : '';
    // Strip control characters (incl. CR/LF) from single-line fields.
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocal = (bool) preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin);
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true) && !$isLocal) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// --- Spam traps ------------------------------------------------------------------
if (field($data, 'website', 200) !== '') {
    quietly_drop('honeypot filled');
}
// Measured in the browser (time since the form appeared), so clock skew between
// the visitor and the server can't drop a real message.
$elapsedMs = isset($data['elapsedMs']) && is_numeric($data['elapsedMs']) ? (int) $data['elapsedMs'] : null;
if ($elapsedMs !== null && $elapsedMs < MIN_FILL_SECONDS * 1000) {
    quietly_drop('submitted too fast');
}

// --- Rate limit per IP --------------------------------------------------------------
// The site sits behind Hostinger's CDN, where REMOTE_ADDR can be the edge node
// shared by many visitors; the forwarded client IP avoids throttling them together.
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', $ip)[0]);
$rlDir = sys_get_temp_dir() . '/wynex-contact-rl';
if (!is_dir($rlDir)) {
    @mkdir($rlDir, 0700, true);
}
$rlFile = $rlDir . '/' . hash('sha256', $ip);
$now = time();
$hits = is_file($rlFile) ? (json_decode((string) @file_get_contents($rlFile), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn ($t) => is_int($t) && $t > $now - RATE_WINDOW));
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'Too many messages. Please try again in a few minutes.']);
}

// --- Validate -----------------------------------------------------------------------
$type = field($data, 'type', 20) === 'newsletter' ? 'newsletter' : 'contact';
$email = field($data, 'email', 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

if ($type === 'contact') {
    $name = field($data, 'name', 100);
    $phone = field($data, 'phone', 30);
    $city = field($data, 'city', 80);
    $state = field($data, 'state', 80);
    $service = field($data, 'service', 100);
    $message = isset($data['message']) && is_string($data['message']) ? trim($data['message']) : '';
    $message = mb_substr(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $message) ?? '', 0, 5000);

    if ($name === '') {
        respond(422, ['ok' => false, 'error' => 'Please enter your name.']);
    }
    if (preg_match_all('#https?://#i', $message) > 3) {
        quietly_drop('too many links');
    }
}

// --- Send ---------------------------------------------------------------------------
$configFile = __DIR__ . '/mail-config.php';
$config = is_file($configFile) ? require $configFile : null;
if (!is_array($config) || empty($config['smtp_password'])) {
    error_log('contact.php: mail-config.php missing or has no smtp_password');
    respond(500, ['ok' => false, 'error' => 'Email is not configured yet.']);
}

$h = fn (string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
$when = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('d M Y, h:i A') . ' IST';

if ($type === 'newsletter') {
    $subject = "New newsletter subscriber: $email";
    $rows = ['Email' => $email];
    $intro = 'Someone subscribed to the newsletter on wynextechnologies.com.';
} else {
    $subject = "New enquiry from $name" . ($service !== '' ? " — $service" : '');
    $rows = ['Name' => $name, 'Email' => $email, 'Phone' => $phone, 'City' => $city, 'State' => $state, 'Service' => $service];
    $intro = 'New enquiry from the contact form on wynextechnologies.com. Reply to this email to respond directly.';
}
$rows['Received'] = $when;

$text = $intro . "\n\n";
$html = '<p>' . $h($intro) . '</p><table cellpadding="6" style="border-collapse:collapse">';
foreach ($rows as $label => $value) {
    if ($value === '') {
        continue;
    }
    $text .= "$label: $value\n";
    $html .= '<tr><td style="color:#555"><strong>' . $h($label) . '</strong></td><td>' . $h($value) . '</td></tr>';
}
$html .= '</table>';
if ($type === 'contact' && $message !== '') {
    $text .= "\nMessage:\n$message\n";
    $html .= '<p><strong>Message</strong></p><p>' . nl2br($h($message)) . '</p>';
}

$mailbox = $config['smtp_user'] ?? SITE_MAILBOX;
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'] ?? 'smtp.hostinger.com';
    $mail->Port = (int) ($config['smtp_port'] ?? 465);
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = $mailbox;
    $mail->Password = $config['smtp_password'];
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 15;

    $mail->setFrom($mailbox, 'Wynex Technologies Website');
    $mail->addAddress($config['to'] ?? SITE_MAILBOX);
    $mail->addReplyTo($email, $type === 'contact' ? $name : '');

    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $html;
    $mail->AltBody = $text;

    $mail->send();
} catch (MailException $e) {
    error_log('contact.php: send failed: ' . $mail->ErrorInfo);
    respond(502, ['ok' => false, 'error' => 'Could not send your message right now.']);
}

$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

respond(200, ['ok' => true]);
