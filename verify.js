// Configuration: Replace with your Cognito User Pool ID and App Client ID
const USER_POOL_ID = 'us-east-1_s0CLhJKA9';  // Replace with your User Pool ID
const CLIENT_ID = '7idcfgsp88dmqgnum16bmapjgg'; // Replace with your App Client ID

// Initialize AWS Cognito service
AWS.config.region = 'us-east-1'; // Set your region
const cognito = new AWS.CognitoIdentityServiceProvider();

// Verify button click event
document.getElementById('verify-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;
    const messageElement = document.getElementById('message');

    if (!email || !code) {
        messageElement.textContent = 'Both email and code are required.';
        messageElement.style.color = 'red';
        return;
    }

    try {
        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        };

        await cognito.confirmSignUp(params).promise();
        messageElement.textContent = 'Verification successful! Redirecting to login...';
        messageElement.style.color = 'green';

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        messageElement.style.color = 'red';
        console.error('Verification failed:', error);
    }
});
