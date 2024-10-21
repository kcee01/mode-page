// Configuration: Replace with your Cognito User Pool ID and App Client ID
const USER_POOL_ID = 'us-east-1_s0CLhJKA9';  // Replace with your User Pool ID
const CLIENT_ID = '7idcfgsp88dmqgnum16bmapjgg'; // Replace with your App Client ID

// Initialize AWS Cognito service
AWS.config.region = 'us-east-1'; // Set your AWS region
const cognito = new AWS.CognitoIdentityServiceProvider();

// Register button click event
document.getElementById('register-button').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    if (!name || !email || !password) {
        messageElement.textContent = 'All fields are required.';
        messageElement.style.color = 'red';
        return;
    }

    try {
        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'name', Value: name },
            ],
        };

        const result = await cognito.signUp(params).promise();
        messageElement.textContent = 'Registration successful! Redirecting to verification page...';
        messageElement.style.color = 'green';
        console.log('Signup result:', result);

        // Redirect to verification page after a short delay
        setTimeout(() => {
            window.location.href = 'kcee01/mode-page/verify.html';
        }, 2000); // Wait 2 seconds before redirecting
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        messageElement.style.color = 'red';
        console.error('Signup failed:', error);
    }
});
