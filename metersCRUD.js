// Function to load meter data into the table
async function loadMeterData() {
    try {
        const response = await fetch('https://knl38i60ea.execute-api.us-east-1.amazonaws.com/prod/GET_Meters_function');
        if (!response.ok) throw new Error('Error fetching meter data');
        
        const meters = await response.json();
        const tbody = document.querySelector('#meter-table-body');
        tbody.innerHTML = ''; // Clear existing rows

        meters.forEach(meter => {
            const row = document.createElement('tr');
            row.dataset.meterId = meter.MeterID; // Add MeterID as a data attribute for easy access
            row.innerHTML = `
                <td>${meter.MeterID || ''}</td>
                <td>${meter.longitude || ''}</td>
                <td>${meter.latitude || ''}</td>
                <td>${meter.qrCode || ''}</td>
                <td class="action-buttons">
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading meter data:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMeterData);

// Function to start editing a row
function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const currentData = Array.from(cells).slice(0, -1).map(cell => cell.innerText);
    row.setAttribute('data-original', JSON.stringify(currentData)); // Store original data

    row.innerHTML = `
        <td><input type="number" value="${currentData[0]}" readonly></td>
        <td><input type="number" step="0.000001" value="${currentData[1]}"></td>
        <td><input type="number" step="0.000001" value="${currentData[2]}"></td>
        <td><input type="text" value="${currentData[3]}"></td>
        <td class="action-buttons">
            <button onclick="saveRow(this)">Save</button>
            <button onclick="cancelEdit(this)">Cancel</button>
        </td>
    `;
}

// Function to save the edited row
async function saveRow(button) {
    const row = button.closest('tr');
    const meterId = row.dataset.MeterID; // Get MeterID from the row dataset
    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);

    // Prepare the data for the backend
    const meterData = {
        MeterID: MeterID,  // Ensure MeterID is sent as part of the data
        latitude: parseFloat(updatedData[1]) || 0,  // Latitude as a number
        longitude: parseFloat(updatedData[2]) || 0,  // Longitude as a number
        qrCode: updatedData[3] || ''  // QR code can be a string
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
            <td>${updatedData[0]}</td>
            <td>${updatedData[1]}</td>
            <td>${updatedData[2]}</td>
            <td>${updatedData[3]}</td>
            <td class="action-buttons">
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
            </td>
        `;
    } catch (error) {
        console.error('Error saving meter data:', error);
        alert('Failed to save meter data.');
    }
}

// Function to cancel editing a row
function cancelEdit(button) {
    const row = button.closest('tr');
    const originalData = JSON.parse(row.getAttribute('data-original'));

    row.innerHTML = `
        <td>${originalData[0]}</td>
        <td>${originalData[1]}</td>
        <td>${originalData[2]}</td>
        <td>${originalData[3]}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

// Function to delete a row
async function deleteRow(button) {
    const row = button.closest('tr');
    const meterId = row.dataset.meterId;
    const confirmation = confirm("Are you sure you want to delete this record?");
    
    if (confirmation) {
        try {
            const response = await fetch('https://0anbxun285.execute-api.us-east-1.amazonaws.com/prod/Delete_Meters_function', {
                method: 'DELETE',
                body: JSON.stringify({ MeterID: meterId }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error deleting meter data: ${errorText}`);
            }

            alert(`Meter with ID ${meterId} was deleted successfully.`);
            row.remove();
        } catch (error) {
            console.error('Error deleting meter data:', error);
            alert('Failed to delete meter data. Please try again later.');
        }
    }
}

// Load meter data when the page loads
document.addEventListener('DOMContentLoaded', loadMeterData);
