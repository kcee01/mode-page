// Get the user's role from localStorage
const userRole = localStorage.getItem('userRole');

// Display a message based on the user's role
const welcomeMessage = document.getElementById('welcome-message');
if (userRole) {
    welcomeMessage.textContent = `Welcome, ${userRole}!`;
} else {
    welcomeMessage.textContent = 'Welcome, Guest!';
}

// Optionally, you can clear the role after using it
// localStorage.removeItem('userRole');
