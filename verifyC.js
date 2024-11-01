async function handleVerification(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById('Consumerform'));
    const jsonData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://wvnls203o6.execute-api.us-east-1.amazonaws.com/dev/Verify_Consumer_Function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();
        
        if (response.ok) {
            // Display success message and result
            document.getElementById('verification-notification').innerText = result.message;
            document.getElementById('result-display').innerText = JSON.stringify(result, null, 2);
            document.getElementById('success-message').innerText = 'Submission successful!';
        } else {
            // Display error message from Lambda response
            document.getElementById('verification-notification').innerText = result.message || 'Submission failed.';
            document.getElementById('success-message').innerText = '';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('verification-notification').innerText = 'Submission failed due to a network error.';
        document.getElementById('result-display').innerText = ''; // Clear result display on error
        document.getElementById('success-message').innerText = ''; // Clear success message on error
    }
}
