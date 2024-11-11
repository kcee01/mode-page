



async function fetchConsumerProfile() {
    try {
        const response = await fetch('https://b43veeqh8j.execute-api.us-east-1.amazonaws.com/dev/GET_consumers_function'); // Replace with your actual API Gateway URL
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        const consumerData = data[0];  // Access the first item in the returned arrayss
        
        // Update the form fields with fetched data
        document.getElementById('consumer-given-name').value = consumerData.givenName;
        document.getElementById('Consumer-surname').value = consumerData.Surname;
        document.getElementById('consumer-address').value = consumerData.Address;
        document.getElementById('consumer-email-address').value = consumerData.email;

    } catch (error) {
        console.error('Error fetching consumer profile:', error);
    }
}

// Call fetchConsumerProfile when the page loads or section is shown
fetchConsumerProfile();
