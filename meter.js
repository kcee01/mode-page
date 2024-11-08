
        // Attach event listener to the form
        document.getElementById("add-meter-form").addEventListener("submit", async function(event) {
            event.preventDefault();  // Prevent form from submitting the traditional way

            // Collect form data
            const meterData = {
                meterId: document.getElementById("meter-id").value,
                longitude: document.getElementById("longitude").value,
                latitude: document.getElementById("latitude").value
            };

            try {
                // Send POST request to the API Gateway
                const response = await fetch("https://jiok8n9dti.execute-api.us-east-1.amazonaws.com/dev/meters_register_function", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(meterData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // Show success message

                    // Generate QR code on the frontend if successful
                    generateQRCode(result.QRCodeBase64);
                } else {
                    alert("Error: " + (result.error || "Failed to add meter"));
                }
            } catch (error) {
                console.error("Request failed", error);
                alert("An unexpected error occurred");
            }
        });

        // Function to display QR code from Base64 data
        function generateQRCode(base64Data) {
            const qrCodeContainer = document.getElementById("qr-code");
            qrCodeContainer.innerHTML = "";  // Clear previous QR code

            // Create image element to display the Base64-encoded QR code
            const img = new Image();
            img.src = "data:image/png;base64," + base64Data;
            qrCodeContainer.appendChild(img);
        }
