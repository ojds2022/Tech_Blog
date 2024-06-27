const logoutBtn = document.getElementById('logoutBtn');

const logoutBtnHandler = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    document.location.replace('/');
    } else {
    alert('Failed to log out');
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutBtnHandler);
}