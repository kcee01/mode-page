document.querySelector('#consumer-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const consumerData = {
        givenName: document.getElementById('consumer-given-name').value,
        surname: document.getElementById('consumer-surname').value,
        address: document.getElementById('consumer-address').value,
        electricMeterId: document.getElementById('electric-meter-id').value,
        email: document.getElementById('consumer-email').value,
        secretWord: document.getElementById('consumer-secret').value,
        enabled: document.getElementById('enabled').value === 'yes',
        dateOfCreation: document.getElementById('consumer-DOC').value,
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        meterReading: document.getElementById('meter-reading').value,
        imageFileName: document.getElementById('image-file').value,
        billFileName: document.getElementById('bill-file').value,
        enabledByAdmin: document.getElementById('enabled').value === 'yes',
        password: 'generatedPassword123!' // Generate a secure password here
    };

    try {
        const response = await fetch('https://sxgzj2lddj.execute-api.us-east-1.amazonaws.com/dev/Add_Consumers_funtion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consumerData), 
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            alert('Consumer added successfully');
            // Redirect to the new password page, passing the email as a query parameter
            window.location.href = `new_password.html?email=${encodeURIComponent(consumerData.email)}`;
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error adding consumer:', error);
    }
});
