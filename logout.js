// script.js

// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure AmazonCognitoIdentity is available
    if (typeof AmazonCognitoIdentity !== 'undefined') {
        // Cognito configuration - replace with your actual UserPoolId and ClientId
        const poolData = {
            UserPoolId: 'us-east-1_s0CLhJKA9', // Replace with your UserPoolId
            ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Replace with your ClientId
        };

        // Initialize Cognito User Pool
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        console.log('Cognito User Pool initialized:', userPool);

        // Example function to log out the user
        document.getElementById('logout-button').addEventListener('click', logoutUser);
    } else {
        console.error('AmazonCognitoIdentity is not defined. Please check the script loading.');
    }
});

// Function to log out the user
function logoutUser() {
    const user = userPool.getCurrentUser(); // Get the currently authenticated user

    if (user) {
        user.signOut();
        console.log('User signed out.');
        // Redirect or perform other actions after logout
        window.location.href = 'Login.html'; // Redirect to your login page
    } else {
        console.log("No user is currently logged in.");
    }
}
