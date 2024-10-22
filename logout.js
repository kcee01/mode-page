const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // Replace with your User Pool ID
    ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Replace with your Client ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Logout logic
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.signOut(); // Perform logout
        alert('You have been logged out successfully.');

        // Redirect to login page after logout
        window.location.href = 'login.html';
    } else {
        alert('No user is currently logged in.');
    }
});