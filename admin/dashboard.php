<?php
session_start();
require __DIR__ . '/../php/db_connect.php';

if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

// Handle delete
if (isset($_GET['delete_inquiry'])) {
    $id = (int)$_GET['delete_inquiry'];
    $conn->query("DELETE FROM contact_inquiries WHERE id = $id");
    header('Location: dashboard.php?tab=inquiries');
    exit;
}
if (isset($_GET['delete_feedback'])) {
    $id = (int)$_GET['delete_feedback'];
    $conn->query("DELETE FROM customer_feedback WHERE id = $id");
    header('Location: dashboard.php?tab=feedback');
    exit;
}

// Export CSV
if (isset($_GET['export']) && $_GET['export'] === 'inquiries') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="contact_inquiries.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['ID','Name','Email','Phone','Company','Country','Job Title','Job Details','Created']);
    $r = $conn->query("SELECT * FROM contact_inquiries ORDER BY created_at DESC");
    while ($row = $r->fetch_assoc()) fputcsv($out, $row);
    fclose($out); exit;
}

// Stats
$total_inquiries = (int)$conn->query("SELECT COUNT(*) AS c FROM contact_inquiries")->fetch_assoc()['c'];
$total_feedback  = (int)$conn->query("SELECT COUNT(*) AS c FROM customer_feedback")->fetch_assoc()['c'];
$total_events    = (int)$conn->query("SELECT COUNT(*) AS c FROM event_registrations")->fetch_assoc()['c'];

$search = trim($_GET['q'] ?? '');
$where = '';
if ($search !== '') {
    $s = $conn->real_escape_string($search);
    $where = "WHERE full_name LIKE '%$s%' OR email LIKE '%$s%' OR company LIKE '%$s%' OR country LIKE '%$s%'";
}
$inquiries = $conn->query("SELECT * FROM contact_inquiries $where ORDER BY created_at DESC");
$feedbacks = $conn->query("SELECT * FROM customer_feedback ORDER BY created_at DESC");
$events    = $conn->query("SELECT * FROM event_registrations ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Dashboard | AI-Solutions</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="../css/style.css">
</head>
<body class="admin-body">
<nav class="navbar navbar-dark admin-nav px-4">
  <span class="navbar-brand fw-bold"><i class="fa-solid fa-robot me-2 text-info"></i>AI-Solutions Admin</span>
  <div>
    <span class="me-3 admin-username">Hi, <?= htmlspecialchars($_SESSION['admin_username']) ?></span>
    <a href="logout.php" class="btn btn-sm btn-outline-light logout-link"><i class="fa fa-right-from-bracket"></i> Logout</a>
  </div>
</nav>

<div class="container-fluid p-4">
  <div class="row g-3 mb-4">
    <div class="col-md-4"><div class="stat-card glass"><i class="fa-solid fa-envelope-open-text"></i><h3><?= $total_inquiries ?></h3><p>Total Inquiries</p></div></div>
    <div class="col-md-4"><div class="stat-card glass"><i class="fa-solid fa-star"></i><h3><?= $total_feedback ?></h3><p>Customer Feedback</p></div></div>
    <div class="col-md-4"><div class="stat-card glass"><i class="fa-solid fa-calendar-check"></i><h3><?= $total_events ?></h3><p>Event Registrations</p></div></div>
  </div>

  <ul class="nav nav-pills mb-3" id="adminTabs" role="tablist">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#tab-inquiries">Inquiries</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-feedback">Feedback</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-events">Events</button></li>
  </ul>

  <div class="tab-content">
    <!-- Inquiries -->
    <div class="tab-pane fade show active" id="tab-inquiries">
      <div class="d-flex justify-content-between mb-2 flex-wrap gap-2">
        <form class="d-flex" method="get">
          <input type="search" class="form-control me-2" name="q" placeholder="Search inquiries..." value="<?= htmlspecialchars($search) ?>">
          <button class="btn btn-neon">Search</button>
        </form>
        <a class="btn btn-outline-info" href="?export=inquiries"><i class="fa fa-download me-1"></i>Export CSV</a>
      </div>
      <div class="table-responsive glass p-2">
        <table class="table table-dark table-hover align-middle">
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Country</th><th>Job Title</th><th>Details</th><th>Date</th><th></th></tr></thead>
          <tbody>
          <?php while ($row = $inquiries->fetch_assoc()): ?>
            <tr>
              <td><?= $row['id'] ?></td>
              <td><?= htmlspecialchars($row['full_name']) ?></td>
              <td><?= htmlspecialchars($row['email']) ?></td>
              <td><?= htmlspecialchars($row['phone']) ?></td>
              <td><?= htmlspecialchars($row['company']) ?></td>
              <td><?= htmlspecialchars($row['country']) ?></td>
              <td><?= htmlspecialchars($row['job_title']) ?></td>
              <td><?= htmlspecialchars(mb_strimwidth($row['job_details'],0,80,'…')) ?></td>
              <td><?= $row['created_at'] ?></td>
              <td><a class="btn btn-sm btn-danger" href="?delete_inquiry=<?= $row['id'] ?>" onclick="return confirm('Delete this inquiry?')"><i class="fa fa-trash"></i></a></td>
            </tr>
          <?php endwhile; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Feedback -->
    <div class="tab-pane fade" id="tab-feedback">
      <div class="table-responsive glass p-2">
        <table class="table table-dark table-hover align-middle">
          <thead><tr><th>#</th><th>Name</th><th>Company</th><th>Rating</th><th>Message</th><th>Date</th><th></th></tr></thead>
          <tbody>
          <?php while ($row = $feedbacks->fetch_assoc()): ?>
            <tr>
              <td><?= $row['id'] ?></td>
              <td><?= htmlspecialchars($row['name']) ?></td>
              <td><?= htmlspecialchars($row['company']) ?></td>
              <td><?= str_repeat('★', (int)$row['rating']) ?></td>
              <td><?= htmlspecialchars($row['message']) ?></td>
              <td><?= $row['created_at'] ?></td>
              <td><a class="btn btn-sm btn-danger" href="?delete_feedback=<?= $row['id'] ?>" onclick="return confirm('Delete?')"><i class="fa fa-trash"></i></a></td>
            </tr>
          <?php endwhile; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Events -->
    <div class="tab-pane fade" id="tab-events">
      <div class="table-responsive glass p-2">
        <table class="table table-dark table-hover align-middle">
          <thead><tr><th>#</th><th>Event</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th></tr></thead>
          <tbody>
          <?php while ($row = $events->fetch_assoc()): ?>
            <tr>
              <td><?= $row['id'] ?></td>
              <td><?= htmlspecialchars($row['event_name']) ?></td>
              <td><?= htmlspecialchars($row['full_name']) ?></td>
              <td><?= htmlspecialchars($row['email']) ?></td>
              <td><?= htmlspecialchars($row['phone']) ?></td>
              <td><?= $row['created_at'] ?></td>
            </tr>
          <?php endwhile; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
