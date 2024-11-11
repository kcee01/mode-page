
async function loadConsumerData() {
    try {
        const response = await fetch('https://cgolep0nhl.execute-api.us-east-1.amazonaws.com/dev/Display_Consumers_function');
        if (!response.ok) throw new Error('Error fetching consumer data');
        
        const consumers = await response.json();
        const tbody = document.querySelector('#list-consumer-profile tbody');
        tbody.innerHTML = ''; // Clear existing rows

        consumers.forEach(consumer => {
            const row = document.createElement('tr');
            row.dataset.email = consumer.email; // Use lowercase 'email'
            row.innerHTML = `
                <td>${consumer.GivenName || ''}</td>
                <td>${consumer.Surname || ''}</td>
                <td>${consumer.Address || ''}</td>
                <td>${consumer.electricMeterNo || ''}</td>
                <td>${consumer.email || ''}</td> 
                <td>${consumer.enabled || ''}</td>
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
    const email = row.dataset.email;
    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);

    // Constructing the consumer data object
    const consumerData = {
        email: email,  // Correctly set email
        givenName: updatedData[0],
        surname: updatedData[1],
        address: updatedData[2],
        electricMeterNo: updatedData[3],
        enabled: updatedData[5] === 'true',  // Ensure boolean conversion
        dateOfCreation: updatedData[6],
        Year: parseInt(updatedData[7], 10) || 0, // Convert to integer
        Month: parseInt(updatedData[8], 10) || 0, // Convert to integer
        MeterReading: parseFloat(updatedData[9]) || 0, // Convert to float
        ImageFileName: updatedData[10],
        BillFileName: updatedData[11],
        EnabledByAdmin: updatedData[12] === 'true' // Convert to boolean
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
            const errorText = await response.text(); // Log response text for more details
            throw new Error(`Error updating consumer data: ${errorText}`);
        }
        const updatedAttributes = await response.json();
        console.log('API response received:', updatedAttributes);

        // Alert on successful update
        console.log('Consumer profile updated successfully.');
        alert('Consumer profile updated successfully.');


        // Update data in the DOM if successful
        row.innerHTML = `
            <td>${updatedData[0]}</td>
            <td>${updatedData[1]}</td>
            <td>${updatedData[2]}</td>
            <td>${updatedData[3]}</td>
            <td>${email}</td>  
            <td>${updatedData[5]}</td>
            <td>${updatedData[6]}</td>
            <td>${updatedData[7]}</td>
            <td>${updatedData[8]}</td>
            <td>${updatedData[9]}</td>
            <td>${updatedData[10]}</td>
            <td>${updatedData[11]}</td>
            <td>${updatedData[12]}</td>
            <td class="action-buttons">
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
            </td>
        `;
    } catch (error) {
        console.error('Error saving consumer data:', error);
        alert('Failed to save consumer data.');
    }
}


function cancelEdit(button) {
    const row = button.closest('tr');
    const originalData = JSON.parse(row.getAttribute('data-original'));

    row.innerHTML = `
        <td>${originalData[0]}</td>
        <td>${originalData[1]}</td>
        <td>${originalData[2]}</td>
        <td>${originalData[3]}</td>
        <td>${originalData[4]}</td>
        <td>${originalData[5]}</td>
        <td>${originalData[6]}</td>
        <td>${originalData[7]}</td>
        <td>${originalData[8]}</td>
        <td>${originalData[9]}</td>
        <td>${originalData[10]}</td>
        <td>${originalData[11]}</td>
        <td>${originalData[12]}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

async function deleteRow(button) {
    const row = button.closest('tr');
    const email = row.dataset.email;
    const confirmation = confirm("Are you sure you want to delete this record?");
    
    if (confirmation) {
        try {
            // Send a DELETE request to the backend
            const response = await fetch('https://hp2u2l5hmc.execute-api.us-east-1.amazonaws.com/dev/Delete_Consumers_function', {
                method: 'DELETE',
                body: JSON.stringify({ Email: email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text(); // Fetch error details
                throw new Error(`Error deleting consumer data: ${errorText}`);
            }

            // Alert success and remove row from DOM
            alert(`Consumer with email ${email} was deleted successfully.`);
            row.remove();
            
        } catch (error) {
            console.error('Error deleting consumer data:', error);
            alert('Failed to delete consumer data. Please try again later.');
        }
    }
}

// Load consumer data when the page loads
document.addEventListener('DOMContentLoaded', loadConsumerData);














