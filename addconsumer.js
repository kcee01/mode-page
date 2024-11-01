
    // Initialize Cognito Use
    
    const poolData = {
        UserPoolId: 'us-east-1_s0CLhJKA9',
        ClientId: '7idcfgsp88dmqgnum16bmapjgg',
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let cognitoUser;

    document.querySelector('#consumer-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const consumerData = {
            givenName: document.getElementById('consumer-given-name').value,
            surname: document.getElementById('consumer-surname').value,
            address: document.getElementById('consumer-address').value,
            electricMeterId: document.getElementById('electric-meter-id').value,
            email: document.getElementById('consumer-email').value,
            secretWord: document.getElementById('consumer-secret').value,
            enabled: document.getElementById('enabled').value === 'yes',
            dateOfCreation: document.getElementById('consumer-DOC').value,
            meterReading: document.getElementById('meter-reading').value,
            imageFileName: document.getElementById('image-file').value,
            billFileName: document.getElementById('bill-file').value,
            enabledByAdmin: document.getElementById('enabled-admin').value === 'yes',
            password: 'generatedPassword123!', // This is temporary; handle password generation securely
        };

        // First, create the Cognito user
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: consumerData.email,
            Password: consumerData.password,
        });

        cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: consumerData.email,
            Pool: userPool,
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async function (result) {
                // Successfully logged in, now add consumer to DynamoDB
                await addConsumerToDynamoDB(consumerData);
                console.log('Access token: ' + result.getAccessToken().getJwtToken());
            },

            onFailure: function (err) {
                console.error('Login failed: ', err);
                if (err.code === 'NEW_PASSWORD_REQUIRED') {
                    handleNewPasswordRequired(err);
                }
            },

            mfaRequired: function (codeDeliveryDetails) {
                console.error('MFA required:', codeDeliveryDetails);
            },

            customChallenge: function (challengeParameters) {
                console.error('Custom challenge:', challengeParameters);
            }
        });
    });

    async function addConsumerToDynamoDB(consumerData) {
        try {
            const response = await fetch('https://sxgzj2lddj.execute-api.us-east-1.amazonaws.com/dev/Add_Consumers_function', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(consumerData),
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                alert('Consumer added successfully');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error adding consumer:', error);
        }
    }

    function handleNewPasswordRequired(challenge) {
        // Prompt user for new password
        const newPassword = prompt('Please enter a new password:');
        const attributes = {
            'custom:role1': 'Customer', // Include any additional required attributes here
        };

        cognitoUser.completeNewPasswordChallenge(newPassword, attributes, {
            onSuccess: function (result) {
                console.log('New password set successfully: ' + result.getAccessToken().getJwtToken());
                // After setting the new password, add the consumer to DynamoDB
                addConsumerToDynamoDB({
                    ...consumerData, // Make sure you include necessary data
                    password: newPassword // Use the new password
                });
            },
            onFailure: function (err) {
                console.error('Failed to set new password:', err);
            }
        });
    }

