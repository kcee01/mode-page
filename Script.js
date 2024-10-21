const API_BASE_URL = 'https://vj3avi5k0b.execute-api.us-east-1.amazonaws.com/';  // Replace with your API Gateway URL

document.getElementById('auth-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
            console.log('Token:', data.token);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Login failed:', error);
    }
});