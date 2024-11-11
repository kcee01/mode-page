


async function fetchConsumerProfile() {
    try {
        const response = await fetch('https://b43veeqh8j.execute-api.us-east-1.amazonaws.com/dev/GET_consumers_function');
        
        if (!response.ok) {
            console.log('Response status:', response.status);
            console.log('Response details:', await response.text());
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        
        // Check if data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
            const consumerData = data[0];  // Access the first item in the returned array
            
            // Update the form fields with fetched data
            document.getElementById('consumer-given-name').value = consumerData.givenName || '';
            document.getElementById('consumer-surname').value = consumerData.surname || '';
            document.getElementById('consumer-address').value = consumerData.address || '';
            document.getElementById('consumer-email-address').value = consumerData.email || '';
        } else {
            console.warn('No consumer data found');
        }

    } catch (error) {
        console.error('Error fetching consumer profile:', error);
    }
}

// Call fetchConsumerProfile when the page loads or section is shown
fetchConsumerProfile();
