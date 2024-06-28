const logoutBtn = document.getElementById('logoutBtn');

const logoutBtnHandler = async () => {
    let confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
            window.location.href = '/login';
        } else {
            alert('Failed to log out');
        }
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutBtnHandler);
}