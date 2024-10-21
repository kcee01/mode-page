const API_URL = 'https://2g31ajcvxa.execute-api.us-east-1.amazonaws.com/user_dev';

async function handleButtonClick(userType) {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userType, username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred. Please try again.');
    }
}

document.getElementById('admin-button').addEventListener('click', () => handleButtonClick('admin'));
document.getElementById('customer-button').addEventListener('click', () => handleButtonClick('customer'));
