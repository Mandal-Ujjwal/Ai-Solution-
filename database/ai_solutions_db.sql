-- ===========================================================
-- AI-Solutions Database Schema
-- Database: ai_solutions_db
-- Import in phpMyAdmin: create DB then import this file,
-- or simply run the entire file (it creates the DB).
-- ===========================================================

CREATE DATABASE IF NOT EXISTS ai_solutions_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ai_solutions_db;

-- -----------------------------------------------------------
-- 1) Contact Inquiries
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(120) NOT NULL,
  email         VARCHAR(160) NOT NULL,
  phone         VARCHAR(40)  NULL,
  company       VARCHAR(160) NULL,
  country       VARCHAR(80)  NULL,
  job_title     VARCHAR(120) NULL,
  job_details   TEXT         NOT NULL,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 2) Customer Feedback
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_feedback (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  company     VARCHAR(160) NULL,
  rating      TINYINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT         NOT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- 3) Admin Users
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin: admin / admin123  (bcrypt hash for "admin123")
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2y$10$E8kP3M8m5xk0l8mAY1TfQO9Y3O2y5l5p3K7c8sQbV5D7nF2k9Z1Ji')
ON DUPLICATE KEY UPDATE username = username;
-- NOTE: On first run of admin/login.php the system will auto-upgrade
-- this hash to a fresh bcrypt of "admin123" if needed.

-- -----------------------------------------------------------
-- 4) Event Registrations
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS event_registrations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  event_name  VARCHAR(160) NOT NULL,
  full_name   VARCHAR(120) NOT NULL,
  email       VARCHAR(160) NOT NULL,
  phone       VARCHAR(40)  NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event (event_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
