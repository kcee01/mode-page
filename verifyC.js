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

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        // Display the main message and full result in JSON format on the frontend
        document.getElementById('verification-notification').innerText = result.message || 'Verification successful';
        document.getElementById('result-display').innerText = JSON.stringify(result, null, 2); // Display the entire result object
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('verification-notification').innerText = 'Submission failed.';
        document.getElementById('result-display').innerText = ''; // Clear result display on error
    }
}
