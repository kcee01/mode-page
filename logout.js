
// Cognito configuration - replace with your actual UserPoolId and ClientId
const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // Replace with your UserPoolId
    ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Replace with your ClientId
};

// Initialize Cognito User Pool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Function to log out the user
function logoutUser() {
    console.log("Logout button clicked.");

    const user = userPool.getCurrentUser(); // Get the currently authenticated user

    if (user) {
        console.log("User found. Logging out...");

        // Sign out from the local session
        user.signOut();

        // Optional: Clear storage
        localStorage.clear();
        sessionStorage.clear();

        // Confirm redirection
        console.log("User signed out. Redirecting to Login.html...");

        // Redirect to login page
        window.location.href = 'Login.html';
    } else {
        console.log("No user is currently logged in.");
    }
}

// Attach logout functionality to the button
document.getElementById('logout-button').addEventListener('click', logoutUser);
