// Fetch Meter reading and display it
// Fetch Meter reading and display it
async function getOCRReading() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email.");
        return;
    }

    try {
        const response = await fetch(`https://n9krhb40p7.execute-api.us-east-1.amazonaws.com/prod/GET_meter_reading_function?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error("Response error:", await response.text());
            alert("Error fetching Meter reading.");
            return;
        }

        const data = await response.json();
        document.getElementById('ocrReading').value = data.meterReading || "No reading found for this email.";
        document.getElementById('confirmButton').style.display = 'inline-block'; // Show Confirm Reading button
        document.getElementById('manualButton').style.display = 'inline-block'; // Show Manual Entry button
    } catch (error) {
        alert("Error fetching Meter reading.");
        console.error("Fetch error:", error);
    }
}



// Confirm the OCR reading as correct
async function confirmReading() {
    const email = document.getElementById('email').value;
    const ocrReading = document.getElementById('ocrReading').value;

    if (!email || !ocrReading) {
        alert("Please enter a valid email and reading.");
        return;
    }

    try {
        const response = await fetch("https://olkox9e8v5.execute-api.us-east-1.amazonaws.com/prod/Update_meter_reading_function", {
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

        if (!response.ok) {
            console.error("Response error:", await response.text());
            alert("Error confirming reading.");
            return;
        }

        const data = await response.json();
        alert(data.message || "Reading confirmed successfully!");
    } catch (error) {
        alert("Error confirming reading.");
        console.error("Fetch error:", error);
    }
}


// Show manual entry input
function showManualEntry() {
    document.getElementById('manualEntryGroup').style.display = 'block'; // Show manual entry fields
    document.getElementById('confirmButton').style.display = 'none'; // Hide confirm button
}

// Submit manually entered reading
async function submitManualReading() {
    const email = document.getElementById('email').value;
    const manualReading = document.getElementById('manualReading').value;

    if (!email || !manualReading) {
        alert("Please enter a valid email and manual reading.");
        return;
    }

    try {
        const response = await fetch("https://8klqov49cl.execute-api.us-east-1.amazonaws.com/prod/Manual_meter_reading_function", {
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

        if (!response.ok) {
            console.error("Response error:", await response.text());
            alert("Error submitting manual reading.");
            return;
        }

        const data = await response.json();
        alert(data.message || "Manual reading submitted successfully!");
    } catch (error) {
        alert("Error submitting manual reading.");
        console.error("Fetch error:", error);
    }
}
