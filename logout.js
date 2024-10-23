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


// Initialize Cognito User Pool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


// Function to log out the user
function logoutUser() {
    const user = userPool.getCurrentUser(); // Get the currently authenticated user

    if (user) {
        user.signOut(); // Sign out the user
        console.log("User signed out successfully.");
    } else {
        console.log("No user is currently logged in.");
    }
}

// Execute the logout function and then redirect to Login.html
logoutUser();
window.location.href = 'Login.html'; // Redirect to login page
