<?php
require __DIR__ . '/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Invalid request method'], 405);
}

$event_name = trim($_POST['event_name'] ?? '');
$full_name  = trim($_POST['full_name']  ?? '');
$email      = trim($_POST['email']      ?? '');
$phone      = trim($_POST['phone']      ?? '');

if ($event_name === '' || $full_name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['ok' => false, 'message' => 'Please provide event, name and a valid email.'], 422);
}

$stmt = $conn->prepare("INSERT INTO event_registrations (event_name, full_name, email, phone) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssss', $event_name, $full_name, $email, $phone);

if ($stmt->execute()) {
    json_response(['ok' => true, 'message' => 'You are registered for ' . htmlspecialchars($event_name) . '.']);
} else {
    json_response(['ok' => false, 'message' => 'Could not register for event.'], 500);
}
