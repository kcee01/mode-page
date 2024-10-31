
        async function handleVerification(event) {
            event.preventDefault();

            // Capture form data
            const givenName = document.getElementById("given-name").value;
            const surname = document.getElementById("surname").value;
            const address = document.getElementById("address").value;
            const email = document.getElementById("email-address").value;

            // Define API Gateway endpoint
            const apiEndpoint = "https://yel6hzf61c.execute-api.us-east-1.amazonaws.com/prod/verifyAdmin"; // Replace with your API Gateway endpoint URL

            // Data to send to Lambda
            const data = { 
                givenName, 
                surname, 
                address, 
                email 
            };

            // Send data to API Gateway
            try {
                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    document.getElementById("verification-notification").innerText = "Admin verified and data saved successfully!";
                    document.getElementById("verification-notification").style.color = "green";
                } else {
                    document.getElementById("verification-notification").innerText = "Failed to verify admin.";
                    document.getElementById("verification-notification").style.color = "red";
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                document.getElementById("verification-notification").innerText = "An error occurred while submitting the form.";
                document.getElementById("verification-notification").style.color = "red";
            }
        }

