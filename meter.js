// Attach event listener to the form
document.getElementById("add-meter-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Collect form data
    const meterData = {
        meterId: document.getElementById("meter-id").value,
        longitude: document.getElementById("longitude").value,
        latitude: document.getElementById("latitude").value
    };

    console.log("Form data collected:", meterData); // Log collected data

    try {
        // Send POST request to the API Gateway
        console.log("Sending request to API Gateway...");
        const response = await fetch("https://jiok8n9dti.execute-api.us-east-1.amazonaws.com/dev/meters_register_function", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meterData)
        });

        console.log("API response received:", response); // Log response object

        const result = await response.json();

        if (response.ok) {
            console.log("Meter registered successfully:", result); // Log the successful result

            alert(result.message); // Display success message

            // Display QR Code URL or generate it locally if needed
            const qrCodeContainer = document.getElementById("qr-code");
            qrCodeContainer.innerHTML = ""; // Clear any previous QR code
            const qrCode = new QRCode(qrCodeContainer, result.QRCodeURL);

        } else {
            console.error("Error while adding meter:", result.error); // Log error from API response
            alert("Error: " + (result.error || "Failed to add meter"));
        }
    } catch (error) {
        console.error("Request failed with error:", error); // Log error if request fails
        alert("An unexpected error occurred");
    }
});
