document.addEventListener('DOMContentLoaded', (event) => {
  const loginForm = document.getElementById('loginForm');

  const loginFormHandler = async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        window.location.href = '/dashboard';  
      } else {
        alert(response.statusText);
      }
    }
  }

  loginForm.addEventListener('submit', loginFormHandler);
});