// Function to handle form submission
async function handleVerification(event) {
    event.preventDefault(); // Prevent the default form submission

    const givenName = document.getElementById('given-name').value;
    const surname = document.getElementById('surname').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email-address').value;

    const data = {
        givenName,
        surname,
        address,
        email
    };

    try {
        console.log("Sending data:", data); // Log the data being sent
        const response = await fetch('https://yel6hzf61c.execute-api.us-east-1.amazonaws.com/prod/verifyAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Response status:", response.status); // Log the response status
        
        if (!response.ok) {
            const errorData = await response.json(); // Capture error response from the server
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }

        const result = await response.json();
        document.getElementById('verification-notification').innerText = 'Verification successful: ' + JSON.stringify(result);
    } catch (error) {
        document.getElementById('verification-notification').innerText = 'Error: ' + error.message;
        console.error('Error during fetch:', error); // Log the error to the console for debugging
    }
} 

// Populate the form fields when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateFormFields();

    // Attach the form submit event listener
    document.getElementById('adminForm').onsubmit = handleVerification;

});
