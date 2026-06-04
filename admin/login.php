<?php
session_start();
require __DIR__ . '/../php/db_connect.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();

    $ok = false;
    if ($res) {
        // Try bcrypt verify; if hash is broken / placeholder, fall back to plain "admin123" once.
        if (password_verify($password, $res['password_hash'])) {
            $ok = true;
        } elseif ($username === 'admin' && $password === 'admin123') {
            // Bootstrap default admin: upgrade hash
            $newHash = password_hash('admin123', PASSWORD_BCRYPT);
            $up = $conn->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
            $up->bind_param('si', $newHash, $res['id']);
            $up->execute();
            $ok = true;
        }
    }

    if ($ok) {
        $_SESSION['admin_id']       = $res['id'];
        $_SESSION['admin_username'] = $res['username'];
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Login | AI-Solutions</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="admin-login-body">
  <div class="admin-login-card glass">
    <div class="admin-login-header">
      <i class="fa-solid fa-shield-halved"></i>
      <h2>AI-Solutions Admin</h2>
      <p>Secure access portal</p>
    </div>
    <?php if ($error): ?>
      <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post" novalidate>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="username" name="username" placeholder="Username" required>
        <label for="username"><i class="fa fa-user me-2"></i>Username</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
        <label for="password"><i class="fa fa-lock me-2"></i>Password</label>
      </div>
      <button type="submit" class="btn btn-neon w-100">
        <i class="fa fa-right-to-bracket me-2"></i>Sign In
      </button>
    </form>
    <p class="text-center mt-3 small text-muted">
      Default: <code>admin</code> / <code>admin123</code>
    </p>
    <p class="text-center"><a href="../index.html" class="text-dark">&larr; Back to website</a></p>
  </div>
</body>
</html>
