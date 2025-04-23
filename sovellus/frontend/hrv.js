const token = localStorage.getItem('jwtToken');
if (!token) {
  window.location.replace("index.html");
}

const usernameSpan = document.getElementById("username");
if (usernameSpan) {
  usernameSpan.textContent = localStorage.getItem("username") || "Käyttäjänimi";
}

function logout() {
  localStorage.removeItem("jwtToken");
  window.location.replace("index.html");
}

