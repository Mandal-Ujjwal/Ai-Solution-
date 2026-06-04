/* Shared navbar / footer / loader / chat / lightbox / back-to-top
   Injected into every HTML page so we don't repeat boilerplate.
   This script runs BEFORE main.js. */

(function () {
  const nav = `
  <nav class="navbar navbar-expand-lg navbar-ai">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <i class="fa-solid fa-robot me-2"></i>AI-Solutions
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="solutions.html">Solutions</a></li>
          <li class="nav-item"><a class="nav-link" href="industry.html">Industries</a></li>
          <li class="nav-item"><a class="nav-link" href="feedback.html">Feedback</a></li>
          <li class="nav-item"><a class="nav-link" href="blog.html">Articles</a></li>
          <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
          <li class="nav-item"><a class="nav-link" href="events.html">Events</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          <li class="nav-item ms-lg-2"><a class="btn btn-neon btn-sm" href="admin/login.php"><i class="fa fa-lock me-1"></i>Admin</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <h5><i class="fa-solid fa-robot me-2 text-info"></i>AI-Solutions</h5>
          <p class="text-secondary">Sunderland-based AI software studio engineering smart, future-ready digital experiences for forward-thinking businesses.</p>
          <div class="social-icons mt-3">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <div class="col-md-2">
          <h5>Explore</h5>
          <ul class="list-unstyled">
            <li><a href="solutions.html">Solutions</a></li>
            <li><a href="industry.html">Industries</a></li>
            <li><a href="blog.html">Articles</a></li>
            <li><a href="events.html">Events</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Contact</h5>
          <p class="text-secondary mb-1"><i class="fa fa-location-dot me-2"></i>Sunderland, United Kingdom</p>
          <p class="text-secondary mb-1"><i class="fa fa-envelope me-2"></i>hello@ai-solutions.co.uk</p>
          <p class="text-secondary mb-0"><i class="fa fa-phone me-2"></i>+44 191 000 0000</p>
        </div>
        <div class="col-md-3">
          <h5>Newsletter</h5>
          <p class="text-secondary">AI insights, product news and event invites.</p>
          <form id="newsletter-form" class="d-flex gap-2">
            <input type="email" class="form-control" placeholder="you@email.com" required>
            <button class="btn btn-neon"><i class="fa fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <hr class="border-secondary mt-4">
      <p class="text-center text-secondary small mb-0">&copy; ${new Date().getFullYear()} AI-Solutions. All rights reserved.</p>
    </div>
  </footer>`;

  const extras = `
  <button id="backToTop" aria-label="Back to top"><i class="fa fa-arrow-up"></i></button>
  <div class="lightbox" id="lightbox"><button class="close-lb">&times;</button><img alt=""></div>
  <button id="chat-toggle" aria-label="Open chat"><i class="fa fa-comments"></i></button>
  <div id="chat-window" class="glass">
    <h6 class="mb-2 text-info"><i class="fa fa-robot me-2"></i>AI Assistant</h6>
    <div class="chat-log" style="max-height:220px;overflow:auto;margin-bottom:.5rem">
      <div class="chat-msg">Hi! I'm AI-Solutions' assistant. How can I help today?</div>
    </div>
    <form class="d-flex gap-2">
      <input type="text" class="form-control form-control-sm" placeholder="Type a message...">
      <button class="btn btn-neon btn-sm"><i class="fa fa-paper-plane"></i></button>
    </form>
  </div>
  <div id="loader"><div class="loader-ring"></div></div>`;

  document.addEventListener('DOMContentLoaded', () => {
    const navSlot = document.getElementById('site-nav');
    const footSlot = document.getElementById('site-footer');
    if (navSlot) navSlot.outerHTML = nav;
    if (footSlot) footSlot.outerHTML = footer;
    document.body.insertAdjacentHTML('beforeend', extras);
  });
})();
