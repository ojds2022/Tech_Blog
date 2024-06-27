const loginBtn = document.getElementById('loginBtn');

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
        document.location.replace('/');  
      } else {
        alert(response.statusText);
      }
    }
}

if (loginBtn) {
    loginBtn.addEventListener('click', loginFormHandler);
}