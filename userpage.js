const API_URL = 'https://2g31ajcvxa.execute-api.us-east-1.amazonaws.com/user_dev';

async function handleButtonClick(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userType, username, password }),
        });

        const data = await response.json();
        const messageElement = document.getElementById('message');

        if (response.ok) {
            messageElement.textContent = data.message;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = `Error: ${data.error}`;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred. Please try again.');
    }
}

document.getElementById('admin-button').addEventListener('click', () => handleButtonClick('admin'));
document.getElementById('customer-button').addEventListener('click', () => handleButtonClick('customer'));
