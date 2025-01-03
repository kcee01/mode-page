


async function handleVerification(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(document.getElementById('Consumerform'));
    const jsonData = Object.fromEntries(formData.entries());

    try {
        // Displaying a loading alert
        alert('Submitting data...');

        const response = await fetch('https://wvnls203o6.execute-api.us-east-1.amazonaws.com/dev/Verify_Consumer_Function', { // Replace with your actual API Gateway URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();

        // Check response status and display corresponding message
        if (result.success) {
            alert('Verification successful!');
            document.getElementById('verification-notification-consumer').innerText = result.message;
        } else {
            alert('Verification successfull!!!.');
            document.getElementById('verification-notification-consumer').innerText = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during submission.');
        document.getElementById('verification-notification-consumer').innerText = 'Submission failed.';
    }
}
