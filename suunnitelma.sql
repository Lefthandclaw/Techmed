CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hrv_levels (
    level_id SERIAL PRIMARY KEY,
    level_name VARCHAR(50) UNIQUE NOT NULL CHECK (level_name IN ('matala', 'normaali', 'korkea')),
    description TEXT
);

CREATE TABLE hrv_calculations (
    hrv_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    heart_rate INT NOT NULL,
    hrv_score DECIMAL(5,2) NOT NULL,
    stress_level VARCHAR(50) CHECK (stress_level IN ('matala', 'normaali', 'korkea')),
    level_id INT REFERENCES hrv_levels(level_id),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE breathing_exercises (
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('heikko', 'rauhallinen', 'voimakas')),
    level_id INT REFERENCES hrv_levels(level_id) ON DELETE CASCADE
);

CREATE TABLE user_breathing_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    exercise_id INT REFERENCES breathing_exercises(exercise_id) ON DELETE SET NULL,
    duration_minutes INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meditation_exercises (
    meditation_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('heikko', 'rauhallinen', 'voimakas')),
    level_id INT REFERENCES hrv_levels(level_id) ON DELETE CASCADE
);

CREATE TABLE user_meditation_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    meditation_id INT REFERENCES meditation_exercises(meditation_id) ON DELETE SET NULL,
    duration_minutes INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    average_hrv DECIMAL(5,2),
    best_hrv DECIMAL(5,2),
    worst_hrv DECIMAL(5,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
