// 🔐 Token check
const token = localStorage.getItem('jwtToken');
if (!token) {
  window.location.replace("index.html");
}

// 👤 Username greeting
const usernameSpan = document.getElementById("username");
if (usernameSpan) {
  usernameSpan.textContent = localStorage.getItem("username") || "Käyttäjä";
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("jwtToken");
  window.location.replace("index.html");
}
