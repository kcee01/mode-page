
const poolData = {
    UserPoolId: 'us-east-1_s0CLhJKA9', // Your user pool id here
    ClientId: '7idcfgsp88dmqgnum16bmapjgg' // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Handle Forgot Password
document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    const userData = {
        Username: email,
        Pool: userPool
    };
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.forgotPassword({
        onSuccess: function(data) {
            console.log('Password recovery successful:', data);
            alert('Verification code sent to your email.');
            document.getElementById('confirmationForm').style.display = 'block';
        },
        onFailure: function(err) {
            console.error('Error:', err);
            alert(err.message || JSON.stringify(err));
        }
    });
});

// Handle Password Reset Confirmation
document.getElementById('confirmPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const verificationCode = document.getElementById('verificationCode').value;
    const newPassword = document.getElementById('newPassword').value;
    
    const userData = {
        Username: email,
        Pool: userPool
    };
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
            console.log('Password confirmed successfully!');
            alert('Your password has been reset successfully.');
        },
        onFailure(err) {
            console.error('Error:', err);
            alert(err.message || JSON.stringify(err));
        }
    });
});
