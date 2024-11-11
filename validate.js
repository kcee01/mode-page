async function handlevalidate(event) {
    event.preventDefault();

    const email = document.getElementById('consumer-email').value;
    const notification = document.getElementById('Validate-notification');
    notification.innerText = "Validating...";

    console.log("Sending request with email:", email); // Log email before sending

    try {
        const response = await fetch('https://tlgtwp3z6f.execute-api.us-east-1.amazonaws.com/dev/Location_function', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();
        console.log("Response received:", data);

        if (response.ok) {
            notification.innerText = "Validation and geolocation update successful!";
        } else {
            notification.innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Request error:", error);
        notification.innerText = `Request failed: ${error.message}`;
    }
}
