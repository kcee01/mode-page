async function handleVerification(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Form Data:', data);

    // Display verification notification
    const notification = document.getElementById('verification-notification');
    notification.innerHTML = ''; // Clear previous notifications

    // Send data to API Gateway
    try {
        const response = await fetch('https://kblwz1osye.execute-api.us-east-1.amazonaws.com/prod/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            notification.className = 'notification success';
            notification.innerHTML = result.message;
        } else {
            notification.className = 'notification';
            notification.innerHTML = 'Submission failed: ' + result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        notification.className = 'notification';
        notification.innerHTML = 'An error occurred while submitting the data.';
    }

    return false; // Prevent form from submitting to server
}
