(function () {
    const token = localStorage.getItem('jwtToken');
    const currentPage = window.location.pathname;
  
    const isLoginPage = currentPage.endsWith("index.html") || currentPage === "/" || currentPage === "/index.html";
  
    if (!token && !isLoginPage) {
      window.location.replace("index.html");
    }
  })();
  