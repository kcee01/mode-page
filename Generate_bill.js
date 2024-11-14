document.getElementById("generate-bill-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get input values
    const email = document.getElementById("bill-consumer-email").value;
    const month = document.getElementById("month").value;
    const apiUrl = 'https://xu8vgmnat7.execute-api.us-east-1.amazonaws.com/dev/Generate_bill_function';

    console.log("Form submitted, email:", email, "month:", month); // Debug log

    if (!email || !month) {
        alert('Both email and month are required.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, month: month }) // JSON payload
        });

        const data = await response.json();
        if (response.ok) {
            alert('Bill generated and stored successfully!');
            console.log('Success:', data); // Log success data
        } else {
            console.error('Response error:', data);
            alert('Error generating bill: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error generating bill:', error);
        alert('An error occurred while generating the bill.');
    }
});
