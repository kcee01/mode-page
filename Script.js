// Configuration: Replace with your Cognito User Pool ID and App Client ID
const USER_POOL_ID = 'us-east-1_s0CLhJKA9';  // Replace with your User Pool ID
const CLIENT_ID = '7idcfgsp88dmqgnum16bmapjgg'; // Replace with your App Client ID

// Initialize AWS Cognito service
AWS.config.region = 'us-east-1'; // Set your AWS region
const cognito = new AWS.CognitoIdentityServiceProvider();

// Get elements
const authButton = document.getElementById('auth-button');
const messageElement = document.getElementById('message');

// Login button click event
authButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        messageElement.textContent = 'Email and password are required.';
        messageElement.style.color = 'red';
        return;
    }

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };

    try {
        const result = await cognito.initiateAuth(params).promise();
        console.log('Login successful:', result);

        // Get the user attributes including custom:role1
        const user = result.AuthenticationResult;
        const userInfo = await cognito.getUser({ AccessToken: user.AccessToken }).promise();
        
        // Extract the role attribute
        const roleAttribute = userInfo.UserAttributes.find(attr => attr.Name === 'custom:role1');
        const role = roleAttribute ? roleAttribute.Value : null;

        if (role) {
            // Store the user's role in localStorage
            localStorage.setItem('userRole', role);
        }

        messageElement.textContent = 'Login successful! Redirecting...';
        messageElement.style.color = 'green';

        // Redirect to index.html after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // 2 seconds delay before redirecting
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        messageElement.style.color = 'red';
        console.error('Login failed:', error);
    }
});
