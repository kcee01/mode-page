async function loadConsumerData() {
    try {
        // Make a request to the API Gateway endpoint
        const response = await fetch('https://cgolep0nhl.execute-api.us-east-1.amazonaws.com/dev/Display_Consumers_function');
        if (!response.ok) throw new Error('Error fetching consumer data');
        
        const consumers = await response.json();
        console.log('Fetched consumer data:', consumers); // Log data for debugging

        // Get the table body element
        const tbody = document.querySelector('#list-consumer-profile tbody');
        tbody.innerHTML = ''; // Clear existing rows

        // Populate table rows with data
        consumers.forEach(consumer => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${consumer.given_name || ''}</td>
                <td>${consumer.surname || ''}</td>
                <td>${consumer.address || ''}</td>
                <td>${consumer.electric_meter_id || ''}</td>
                <td>${consumer.email || ''}</td>
                <td>${consumer.enabled || ''}</td>
                <td>${consumer.date_of_creation || ''}</td>
                <td>${consumer.year || ''}</td>
                <td>${consumer.month || ''}</td>
                <td>${consumer.meter_reading || ''}</td>
                <td>${consumer.image_file_name || ''}</td>
                <td>${consumer.bill_file_name || ''}</td>
                <td>${consumer.enabled_by_admin || ''}</td>
                <td class="action-buttons">
                    <button>View</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            `;
            
            // Append the row to the table body
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading consumer data:', error); // Enhanced error handling
    }
}

// Load consumer data when the page loads
document.addEventListener('DOMContentLoaded', loadConsumerData);
