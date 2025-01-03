
// Attach event listener to the form
document.getElementById("add-meter-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Collect form data
    const meterData = {
        meterId: document.getElementById("meter-id").value,
        longitude: document.getElementById("longitude").value,
        latitude: document.getElementById("latitude").value,
        qrCode: document.getElementById("meter-id").value // Using Meter ID as QR Code
    };

    try {
        // Send POST request to the API Gateway
        const response = await fetch(" https://jiok8n9dti.execute-api.us-east-1.amazonaws.com/dev/meters_register_function", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meterData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Success message
            generateQRCode(meterData.qrCode); // Generate QR Code if successful
        } else {
            alert("Error: " + (result.error || "Failed to add meter"));
        }
    } catch (error) {
        console.error("Request failed", error);
        alert("An unexpected error occurred");
    }
});

// Function to generate QR code
function generateQRCode(data) {
    const qrCodeContainer = document.getElementById("qr-code");
    qrCodeContainer.innerHTML = ""; // Clear previous QR code
    new QRCode(qrCodeContainer, data); // Generate new QR code
}