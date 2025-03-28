DROP DATABASE IF EXISTS healthdiary;
CREATE DATABASE healthdiary;

USE healthdiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'regular'
);


INSERT INTO Users (username, password, email, created_at, user_level) VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', '2024-01-01 09:00:00', 'regular'),
('mothaops', 'hashed_password', 'mothaops69@gmail.com', '2024-01-02 10:00:00', 'admin'),
('alice_jones', 'hashed_password', 'alice@example.com', '2024-01-04 08:30:00', 'regular'),
('sarah_wilson', 'hashed_password', 'sarah@example.com', '2024-01-04 14:20:00', 'regular'),
('mike_davis', 'hashed_password', 'mike@example.com', '2024-01-04 16:45:00', 'regular'),
('emma_taylor', 'hashed_password', 'emma@example.com', '2024-01-04 19:30:00', 'regular'),
('chris_moore', 'hashed_password', 'chris@example.com', '2024-01-05 06:15:00', 'regular'),
('bob_brown', 'hashed_password', 'bob@example.com', '2024-01-05 07:45:00', 'regular');