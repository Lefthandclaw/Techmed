const apiBaseUrl = 'http://localhost:3000/api';

const loginSection = document.getElementById('login-section');
const loginForm = document.getElementById('login-form');

let jwtToken = localStorage.getItem('jwtToken');

// Optionally redirect if already logged in
if (jwtToken) {
  window.location.href = "home.html"; // redirect logged in users
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        password 
      })
    });

    if (!response.ok) {
      throw new Error('Invalid credentials.');
    }

    const data = await response.json();
    jwtToken = data.token; 
    localStorage.setItem('jwtToken', jwtToken);

    // ✅ Now redirect to home
    window.location.href = "home.html";

  } catch (error) {
    showLoginError('Kirjautuminen epäonnistui: ' + error.message);
  }
});

function showLoginError(message) {
  const alertBox = document.getElementById('login-alert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 4000);
}
