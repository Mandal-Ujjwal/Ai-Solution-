<?php
require __DIR__ . '/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Invalid request method'], 405);
}

$name    = trim($_POST['name']    ?? '');
$company = trim($_POST['company'] ?? '');
$rating  = (int)($_POST['rating'] ?? 0);
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || $rating < 1 || $rating > 5) {
    json_response(['ok' => false, 'message' => 'Please provide name, rating (1-5) and message.'], 422);
}

$stmt = $conn->prepare("INSERT INTO customer_feedback (name, company, rating, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssis', $name, $company, $rating, $message);

if ($stmt->execute()) {
    json_response(['ok' => true, 'message' => 'Thank you for your feedback!']);
} else {
    json_response(['ok' => false, 'message' => 'Could not save your feedback.'], 500);
}
