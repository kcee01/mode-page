const apiBaseUrl = "https://your-api-id.execute-api.region.amazonaws.com"; // Replace with your actual API URL

// Fetch OCR reading and display it
async function getOCRReading() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email.");
        return;
    }
    
    try {
        const response = await fetch(`${apiBaseUrl}/ocr-reading`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email }) // Pass email to identify the user
        });
        const data = await response.json();
        document.getElementById('ocrReading').value = data.detectedText || "No reading detected.";
    } catch (error) {
        alert("Error fetching OCR reading.");
        console.error(error);
    }
}

// Confirm the OCR-detected reading
async function confirmReading() {
    const email = document.getElementById('email').value;
    const ocrReading = document.getElementById('ocrReading').value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (!ocrReading) {
        alert("No OCR reading available.");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/validate-reading`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                meterReading: ocrReading,
                validated: true
            })
        });
        const data = await response.json();
        alert(data.message || "Reading confirmed successfully!");
    } catch (error) {
        alert("Error confirming reading.");
        console.error(error);
    }
}

// Show manual entry field
function showManualEntry() {
    document.getElementById('manualEntryGroup').style.display = 'block';
}

// Submit a manually entered reading
async function submitManualReading() {
    const email = document.getElementById('email').value;
    const manualReading = document.getElementById('manualReading').value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (!manualReading) {
        alert("Please enter a valid reading.");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/validate-reading`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                meterReading: manualReading,
                validated: false
            })
        });
        const data = await response.json();
        alert(data.message || "Manual reading submitted successfully!");
    } catch (error) {
        alert("Error submitting manual reading.");
        console.error(error);
    }
}