CREATE USER 'user'@'localhost' IDENTIFIED BY 'salasana';
GRANT ALL PRIVILEGES ON `techmed`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;