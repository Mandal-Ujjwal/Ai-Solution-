<?php
require __DIR__ . '/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Invalid request method'], 405);
}

$full_name   = trim($_POST['full_name']   ?? '');
$email       = trim($_POST['email']       ?? '');
$phone       = trim($_POST['phone']       ?? '');
$company     = trim($_POST['company']     ?? '');
$country     = trim($_POST['country']     ?? '');
$job_title   = trim($_POST['job_title']   ?? '');
$job_details = trim($_POST['job_details'] ?? '');

// Basic validation
if ($full_name === '' || $email === '' || $job_details === '') {
    json_response(['ok' => false, 'message' => 'Please fill in required fields.'], 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['ok' => false, 'message' => 'Invalid email address.'], 422);
}

$stmt = $conn->prepare("INSERT INTO contact_inquiries
    (full_name, email, phone, company, country, job_title, job_details)
    VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param('sssssss', $full_name, $email, $phone, $company, $country, $job_title, $job_details);

if ($stmt->execute()) {
    json_response(['ok' => true, 'message' => 'Your inquiry has been submitted. We will contact you shortly.']);
} else {
    json_response(['ok' => false, 'message' => 'Could not save your inquiry.'], 500);
}
