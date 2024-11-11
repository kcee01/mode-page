

    async function handlevalidate(event) {
        event.preventDefault(); // Prevent form from submitting normally
    
        const email = document.getElementById('consumer-email-validation').value;
        const notification = document.getElementById('Validate-notification');
        notification.innerText = "Validating...";

        console.log("Sending request with email:", email); // Log email before sending
    
        try {
            // Make a POST request to the API Gateway endpoint
            const response = await fetch('https://tlgtwp3z6f.execute-api.us-east-1.amazonaws.com/dev/Location_function', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
    
            // Parse response as JSON if successful
            const data = await response.json();
    
            if (response.ok) {
                notification.innerText = "Validation and geolocation update successful!";
            } else {
                notification.innerText = `Error: ${data.message || 'Unexpected error'}`;
            }
        } catch (error) {
            notification.innerText = `Request failed: ${error.message}`;
        }
    }
    