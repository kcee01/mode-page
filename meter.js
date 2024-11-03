// meter.js
document.getElementById('add-meter-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect data from form
    const meterId = document.getElementById('meter-id').value;
    const longitude = document.getElementById('longitude').value;
    const latitude = document.getElementById('latitude').value;
    const qrCode = meterId;  // For simplicity, using meter ID as QR code value

    // Prepare data to be sent to the API
    const meterData = {
        meterId,
        longitude,
        latitude,
        qrCode
    };

    try {
        // Make a POST request to the API Gateway endpoint
        const response = await fetch('https://jiok8n9dti.execute-api.us-east-1.amazonaws.com/dev/meters_register_functions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meterData)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Meter registered successfully!");
            generateQRCode(qrCode);
        } else {
            alert("Failed to register meter: " + result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

function generateQRCode(data) {
    // Assuming a library like QRCode.js is loaded
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ""; // Clear any previous QR code
    new QRCode(qrCodeContainer, data); // Generate new QR code with data as content
}
