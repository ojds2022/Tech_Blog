document.addEventListener('DOMContentLoaded', (event) => {
    const signUpForm = document.getElementById('signUpForm');

    const signUpFormHandler = async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('signUpFirstName').value;
        const lastName = document.getElementById('signUpLastName').value;
        const email = document.getElementById('signUpEmail').value;
        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;

        if (firstName && lastName && email && username && password) {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email_address: email,
                    username: username,
                    password: password
                }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
                document.location.replace('/login');
            } else {
                alert('Failed to sign up.');
            }
        }
    }

    signUpForm.addEventListener('submit', signUpFormHandler);
});