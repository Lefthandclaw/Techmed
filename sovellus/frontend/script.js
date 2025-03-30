const apiBaseUrl = 'http://localhost:3000/api';

const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const diarySection = document.getElementById('diary-section');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const logoutBtn = document.getElementById('logout-btn');

let jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
  showDiary();
}

showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username, 
        "password": password 
      })
    });
    if (!response.ok) {
      throw new Error('Invalid credentials.');
    }
    const data = await response.json();
    jwtToken = data.token; 
    localStorage.setItem('jwtToken', jwtToken);
    showDiary();
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const email = document.getElementById('reg-email').value;

  try {
    const response = await fetch(`${apiBaseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "username": username, 
        "password": password, 
        "email": email 
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    alert('Registration successful! Please log in.');
    showLogin();
  } catch (error) {
    alert('Error during registration: ' + error.message);
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('jwtToken');
  jwtToken = null;
  showLogin();
});

function showLogin() {
  loginSection.style.display = 'block';
  registerSection.style.display = 'none';
  diarySection.style.display = 'none';
}

function showRegister() {
  loginSection.style.display = 'none';
  registerSection.style.display = 'block';
  diarySection.style.display = 'none';
}

function showDiary() {
  loginSection.style.display = 'none';
  registerSection.style.display = 'none';
  diarySection.style.display = 'block';
}
