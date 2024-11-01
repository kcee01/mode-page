
    async function handleVerification(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(document.getElementById('Consumerform'));
        const jsonData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(' https://wvnls203o6.execute-api.us-east-1.amazonaws.com/dev/Verify_Consumer_Function', { // Replace with your actual API Gateway URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });
            const result = await response.json();
            document.getElementById('verification-notification').innerText = result.message;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('verification-notification').innerText = 'Submission failed.';
    }

    }

