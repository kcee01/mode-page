async function loadConsumerData() {
    try {
        const response = await fetch('https://cgolep0nhl.execute-api.us-east-1.amazonaws.com/dev/Display_Consumers_function');
        if (!response.ok) throw new Error('Error fetching consumer data');
        
        const consumers = await response.json();
        const tbody = document.querySelector('#list-consumer-profile tbody');
        tbody.innerHTML = ''; // Clear existing rows

        consumers.forEach(consumer => {
            const row = document.createElement('tr');
            row.dataset.email = consumer.Email; // Store primary key for updates
            row.innerHTML = `
                <td>${consumer.GivenName || ''}</td>
                <td>${consumer.Surname || ''}</td>
                <td>${consumer.Address || ''}</td>
                <td>${consumer.ElectricMeterID || ''}</td>
                <td>${consumer.email || ''}</td>
                <td>${consumer.Enabled || ''}</td>
                <td>${consumer.DateOfCreation || ''}</td>
                <td>${consumer.Year || ''}</td>
                <td>${consumer.Month || ''}</td>
                <td>${consumer.MeterReading || ''}</td>
                <td>${consumer.ImageFileName || ''}</td>
                <td>${consumer.BillFileName || ''}</td>
                <td>${consumer.EnabledByAdmin || ''}</td>
                <td class="action-buttons">
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading consumer data:', error);
    }
}

function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const currentData = Array.from(cells).slice(0, -1).map(cell => cell.innerText);
    row.setAttribute('data-original', JSON.stringify(currentData)); // Store original data

    row.innerHTML = `
        <td><input type="text" value="${currentData[0]}"></td>
        <td><input type="text" value="${currentData[1]}"></td>
        <td><input type="text" value="${currentData[2]}"></td>
        <td><input type="text" value="${currentData[3]}"></td>
        <td><input type="email" value="${currentData[4]}" readonly></td>
        <td><input type="text" value="${currentData[5]}"></td>
        <td><input type="text" value="${currentData[6]}"></td>
        <td><input type="text" value="${currentData[7]}"></td>
        <td><input type="text" value="${currentData[8]}"></td>
        <td><input type="text" value="${currentData[9]}"></td>
        <td><input type="text" value="${currentData[10]}"></td>
        <td><input type="text" value="${currentData[11]}"></td>
        <td><input type="text" value="${currentData[12]}"></td>
        <td class="action-buttons">
            <button onclick="saveRow(this)">Save</button>
            <button onclick="cancelEdit(this)">Cancel</button>
        </td>
    `;
}

async function saveRow(button) {
    const row = button.closest('tr');
    const email = row.dataset.email; // This should correctly fetch the email stored in the row's dataset

    // Validate the email before proceeding
    if (!email) {
        console.error('Email is missing for the consumer');
        alert('Error: Email is missing. Please ensure the consumer data is correct.');
        return; // Exit the function if email is not defined
    }

    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map((input, index) => {
        if (index === 5) return input.checked; // Handle boolean for 'Enabled'
        return input.value;
    });

    const consumerData = {
        Email: email,  // Primary key
        GivenName: updatedData[0],
        Surname: updatedData[1],
        Address: updatedData[2],
        ElectricMeterID: updatedData[3],
        Enabled: updatedData[5],  // Already a boolean
        DateOfCreation: updatedData[6],
        Year: parseInt(updatedData[7], 10) || null, // Convert to integer if required
        Month: parseInt(updatedData[8], 10) || null, // Convert to integer if required
        MeterReading: parseInt(updatedData[9], 10) || null, // Convert to integer if required
        ImageFileName: updatedData[10],
        BillFileName: updatedData[11],
        EnabledByAdmin: updatedData[12] === 'true' // Convert to boolean if necessary
    };
    
    console.log('Sending updated consumer data:', consumerData);

    try {
        const response = await fetch('https://23kv2h4p6k.execute-api.us-east-1.amazonaws.com/dev/update_consumers_function', {
            method: 'POST',
            body: JSON.stringify(consumerData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get more details about the error
            throw new Error(`Error updating consumer data: ${errorText}`);
        }

        const updatedAttributes = await response.json();

        // Update data in the DOM if successful
        row.innerHTML = `
            <td>${consumerData.GivenName}</td>
            <td>${consumerData.Surname}</td>
            <td>${consumerData.Address}</td>
            <td>${consumerData.ElectricMeterID}</td>
            <td>${consumerData.Email}</td> <!-- Ensure the email field is displayed -->
            <td>${consumerData.Enabled}</td>
            <td>${consumerData.DateOfCreation}</td>
            <td>${consumerData.Year}</td>
            <td>${consumerData.Month}</td>
            <td>${consumerData.MeterReading}</td>
            <td>${consumerData.ImageFileName}</td>
            <td>${consumerData.BillFileName}</td>
            <td>${consumerData.EnabledByAdmin}</td>
            <td class="action-buttons">
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
            </td>
        `;
    } catch (error) {
        console.error('Error saving consumer data:', error);
        alert('Failed to save consumer data. Please try again.');
    }
}


async function deleteRow(button) {
    const row = button.closest('tr');
    const email = row.dataset.email;
    const confirmation = confirm("Are you sure you want to delete this record?");
    if (confirmation) {
        // Send a delete request to the backend
        try {
            const response = await fetch('https://auwkyxbesd.execute-api.us-east-1.amazonaws.com/dev/Delete_consumer_function', {
                method: 'DELETE',
                body: JSON.stringify({ Email: email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Error deleting consumer data');

            row.remove(); // Remove the row from the DOM if delete is successful
        } catch (error) {
            console.error('Error deleting consumer data:', error);
        }
    }
}

// Load consumer data when the page loads
document.addEventListener('DOMContentLoaded', loadConsumerData);













