document.addEventListener("DOMContentLoaded", function() {
    async function handleVerification(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(document.getElementById('adminForm'));
        const jsonData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://uthuxd97i2.execute-api.us-east-1.amazonaws.com/dev/verify-Admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            const result = await response.json();

            // Check if the response was successful
            if (response.ok) {
                document.getElementById('verification-notification').innerText = result.message;
            } else {
                document.getElementById('verification-notification').innerText = result.message || 'Submission failed.';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('verification-notification').innerText = 'Submission failed due to a network error.';
        }
    }

    // Attach the form submit handler
    document.getElementById('adminForm').onsubmit = handleVerification;
});
