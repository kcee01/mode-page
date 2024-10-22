// Cognito configuration - replace with your actual UserPoolId and ClientId
const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // Replace with your UserPoolId
    ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Replace with your ClientId
};

// Initialize Cognito User Pool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


// Function to log out the user
function logoutUser() {
    const user = userPool.getCurrentUser(); // Get the currently authenticated user
console.log(user)
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
