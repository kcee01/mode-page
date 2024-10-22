// Cognito configuration - replace with your actual UserPoolId and ClientId
const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // e.g., 'us-east-1_abc123'
    ClientId: '7idcfgsp88dmqgnum16bmapjgg'   // e.g., '1h57kf5cpkdu0h6df23hplfm2g'
};

// Initialize Cognito User Pool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Function to log out the user
function logoutUser() {
    const user = userPool.getCurrentUser(); // Get the currently authenticated user

    if (user) {
        // Sign out from the local session
        user.signOut();

        // Optional: Clear localStorage and sessionStorage (if used)
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page or any desired page after logout
        window.location.href = 'Login.html';
    } else {
        console.log("No user is currently logged in.");
    }
}

// Attach logout functionality to the button
document.getElementById('logout-button').addEventListener('click', logoutUser);

