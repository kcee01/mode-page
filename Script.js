// Configuration: Replace with your Cognito User Pool ID and App Client ID
const USER_POOL_ID = 'us-east-1_s0CLhJKA9';  // Replace with your User Pool ID
const CLIENT_ID = '7idcfgsp88dmqgnum16bmapjgg'; // Replace with your App Client ID
const IDENTITY_POOL_ID = 'us-east-1:be90cc19-13c5-4762-9622-17a6c7968bf4'; // Replace with your Identity Pool ID

// Initialize AWS Cognito service
AWS.config.region = 'us-east-1'; // Set your AWS region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID // Replace with your Identity Pool ID
});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
});

AWS.config.credentials.refresh(); // Refresh credentials


const cognito = new AWS.CognitoIdentityServiceProvider();

AWS.config.credentials.refresh((error) => {
    if (error) {
        console.error('Error refreshing credentials:', error);
    } else {
        console.log('Credentials refreshed successfully');
    }
});


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

            // Redirect to different dashboards based on user role
            if (role === 'Admin') {
                messageElement.textContent = 'Login successful! Redirecting to Admin Dashboard...';
                messageElement.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
                }, 2000); // 2 seconds delay before redirecting
            } else if (role === 'Customer') {
                messageElement.textContent = 'Login successful! Redirecting to Customer Dashboard...';
                messageElement.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'customer-dashboard.html'; // Redirect to customer dashboard
                }, 2000); // 2 seconds delay before redirecting
            } else {
                messageElement.textContent = 'Login successful! No specific dashboard found.';
                messageElement.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirect to a default page
                }, 2000);
            }
        } else {
            messageElement.textContent = 'Role not found. Please contact support.';
            messageElement.style.color = 'red';
        }

    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        messageElement.style.color = 'red';
        console.error('Login failed:', error);
    }
});
