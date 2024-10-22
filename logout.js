// Configure AWS Cognito
const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // Your user pool id here
    ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Check if the script is loaded


// Logout function using class selector
document.querySelector('.logout-button').addEventListener('click', function() {
    const cognitoUser = userPool.getCurrentUser();


    if (cognitoUser) {
        cognitoUser.signOut();
        alert("You have been logged out successfully.");
        window.location.href = 'login.html'; // Redirect to login page or home page
    } else {
        alert("No user is currently logged in.");
    }
});
