// Function to load meter data from the backend
async function loadMeterData() {
    try {
        const response = await fetch('https://knl38i60ea.execute-api.us-east-1.amazonaws.com/prod/GET_Meters_function');
        if (!response.ok) throw new Error('Error fetching meter data');
        
        const meters = await response.json();
        const tbody = document.querySelector('#meter-table-body'); // Reference to the table body
        tbody.innerHTML = ''; // Clear existing rows

        meters.forEach(meter => {
            const row = document.createElement('tr');
            row.dataset.meterId = meter.MeterID;  // Store MeterID in the row's data attribute

            row.innerHTML = `
                <td>${meter.MeterID || ''}</td>
                <td>${meter.longitude || ''}</td>
                <td>${meter.latitude || ''}</td>
                <td>${meter.qrCode || ''}</td>
                <td class="action-buttons-meters">
                    <button onclick="editRowmeters(this)">Edit</button>
                    <button onclick="deleteRowmeters(this)">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading meter data:', error);
    }
}

// Ensure the table is populated when the page is loaded
document.addEventListener('DOMContentLoaded', loadMeterData);

// Function to edit a row (transform cells into input fields)
function editRowmeters(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const currentData = Array.from(cells).slice(0, -1).map(cell => cell.innerText);
    row.setAttribute('data-original', JSON.stringify(currentData)); // Store original data for cancellation

    row.innerHTML = `
        <td><input type="number" value="${currentData[0]}" readonly></td>
        <td><input type="number" step="0.000001" value="${currentData[1]}"></td>
        <td><input type="number" step="0.000001" value="${currentData[2]}"></td>
        <td><input type="text" value="${currentData[3]}"></td>
        <td class="action-buttons-meters">
            <button onclick="saveRowmeters(this)">Save</button>
            <button onclick="cancelEditmeters(this)">Cancel</button>
        </td>
    `;
}

// Function to save changes to the row (and to the backend API)
async function saveRowmeters(button) {
    const row = button.closest('tr');
    const meterId = row.dataset.meterId;  // Ensure meterId is retrieved correctly

    if (!meterId) {
        console.error("MeterID is missing in the row dataset.");
        alert("Failed to update: MeterID not found.");
        return;
    }

    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);

    // Prepare the data for the backend
    const meterData = {
        MeterID: parseInt(meterId),  // Ensure MeterID is sent as a number
        longitude: parseFloat(updatedData[1]) || 0,  // Ensure longitude is a number
        latitude: parseFloat(updatedData[2]) || 0,  // Ensure latitude is a number
        qrCode: updatedData[3] || ''  // QR code as a string
    };

    try {
        const response = await fetch('https://0anbxun285.execute-api.us-east-1.amazonaws.com/prod/UPDATE_METERS_FUNCTION', {
            method: 'POST',
            body: JSON.stringify(meterData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating meter data: ${errorText}`);
        }
        
        alert('Meter profile updated successfully.');

        // Update the table row with new data
        row.innerHTML = `
            <td>${meterId}</td>
            <td>${updatedData[1]}</td>
            <td>${updatedData[2]}</td>
            <td>${updatedData[3]}</td>
            <td class="action-buttons-meters">
                <button onclick="editRowmeters(this)">Edit</button>
                <button onclick="deleteRowmeters(this)">Delete</button>
            </td>
        `;
    } catch (error) {
        console.error('Error saving meter data:', error);
        alert('Failed to save meter data.');
    }
}


// Function to cancel editing and revert to original data
function cancelEditmeters(button) {
    const row = button.closest('tr');
    const originalData = JSON.parse(row.getAttribute('data-original'));

    row.innerHTML = `
        <td>${originalData[0]}</td>
        <td>${originalData[1]}</td>
        <td>${originalData[2]}</td>
        <td>${originalData[3]}</td>
        <td class="action-buttons-meters">
            <button onclick="editRowmeters(this)">Edit</button>
            <button onclick="deleteRowmeters(this)">Delete</button>
        </td>
    `;
}

async function deleteRowmeters(button) {
    const row = button.closest('tr');
    const meterId = Number(row.dataset.meterId);  // Ensure MeterID is a number
    const confirmation = confirm("Are you sure you want to delete this record?");
    
    if (confirmation) {
        try {
            // Send the DELETE request with the 'type' and 'MeterID' in the body
            const response = await fetch('https://unlc6jm57a.execute-api.us-east-1.amazonaws.com/prod/Delete_Meters_function', {
                method: 'DELETE',
                body: JSON.stringify({ 
                    type: 'meter',  // Add the type to indicate we are deleting a meter
                    MeterID: meterId // Include the MeterID as a number
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error deleting meter data: ${errorText}`);
            }

            alert(`Meter with ID ${meterId} was deleted successfully.`);
            row.remove();  // Remove the row from the table
            
        } catch (error) {
            console.error('Error deleting meter data:', error);
            alert('Failed to delete meter data. Please try again later.');
        }
    }
}
