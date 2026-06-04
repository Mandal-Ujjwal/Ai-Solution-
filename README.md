# AI-Solutions — Sunderland

A futuristic, animated 3D business website for the fictional AI company **AI-Solutions** (Sunderland, UK), built with HTML5, CSS3, vanilla JavaScript, **PHP** and **MySQL**, and designed to run on **XAMPP localhost**.

## ✨ Features
- 9 fully responsive pages — Home, Solutions, Past Industry Solutions, Customer Feedback, Articles, Photo Gallery, Events, Contact, Admin.
- Dark futuristic UI, glassmorphism cards, neon-glow buttons, animated gradients.
- **Three.js** 3D animated hero background (icosahedron + torus + star-field with mouse parallax).
- **Particles.js** AI particle background.
- **Typed.js** typing effect, **AOS** + **GSAP** scroll reveals, **Vanilla-Tilt** 3D card hover, **Swiper** testimonial slider, **Bootstrap 5** layout, **Font Awesome** icons.
- Animated counters, countdown timers, masonry gallery with lightbox.
- AJAX contact, feedback and event-registration forms with toast notifications.
- Newsletter form, AI-chatbot UI mockup, animated loading screen, sticky navbar, back-to-top.
- **Admin panel**: secure login (PHP sessions + bcrypt), dashboard with stats, search, delete, CSV export.

## 📁 Project structure
```
ai-solutions/
├── index.html
├── solutions.html
├── industry.html
├── feedback.html
├── blog.html
├── gallery.html
├── events.html
├── contact.html
├── css/style.css
├── js/main.js
├── js/partials.js
├── images/
├── assets/
├── php/
│   ├── db_connect.php
│   ├── contact_process.php
│   ├── feedback_process.php
│   └── event_register_process.php
├── admin/
│   ├── login.php
│   ├── dashboard.php
│   └── logout.php
└── database/
    └── ai_solutions_db.sql
```

## 🚀 XAMPP setup (5 minutes)

1. **Install XAMPP** — https://www.apachefriends.org
2. **Copy the project** into:
   ```
   C:\xampp\htdocs\ai-solutions\
   ```
   (On macOS/Linux: `/Applications/XAMPP/htdocs/ai-solutions/` or `/opt/lampp/htdocs/ai-solutions/`)
3. **Start Apache + MySQL** from the XAMPP control panel.
4. **Import the database**:
   - Open http://localhost/phpmyadmin
   - Click **Import** → choose `database/ai_solutions_db.sql` → **Go**.
   - This creates the `ai_solutions_db` database and all tables.
5. **Open the site**:
   ```
   http://localhost/ai-solutions/
   ```

## 🔑 Default Admin Login
- **URL:** http://localhost/ai-solutions/admin/login.php
- **Username:** `admin`
- **Password:** `admin123`

> The password is upgraded to a fresh bcrypt hash on first successful login. Change it from the database after the first login for production use.

## 🗄️ Database tables
- `contact_inquiries` — submitted contact form data
- `customer_feedback` — customer reviews + ratings
- `event_registrations` — event sign-ups
- `admin_users` — admin credentials (bcrypt hashed)

## 🛠️ DB credentials
Edit `php/db_connect.php` if your XAMPP MySQL has a non-default user/password:
```php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'ai_solutions_db';
```

## 📝 Notes
- All assets (Bootstrap, AOS, GSAP, Three.js, Swiper, Particles.js, Typed.js, Vanilla-Tilt, Font Awesome) are loaded via CDN — internet connection required on first run.
- Gallery images use `picsum.photos` placeholders; replace them in `gallery.html` with your own.
- Forms use `fetch()` JSON responses; PHP scripts return `{ ok: true|false, message: "..." }`.

Built for the *Computer Systems Engineering* university scenario. Have fun! 🚀
