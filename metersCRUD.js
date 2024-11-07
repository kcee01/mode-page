

async function loadMeterData() {
    try {
        const response = await fetch(' https://knl38i60ea.execute-api.us-east-1.amazonaws.com/prod/GET_Meters_function');
        if (!response.ok) throw new Error('Error fetching meter data');
        
        const meters = await response.json();
        const tbody = document.querySelector('#list-meter-profile tbody');
        tbody.innerHTML = ''; // Clear existing rows

        meters.forEach(meter => {
            const row = document.createElement('tr');
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


function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const currentData = Array.from(cells).slice(0, -1).map(cell => cell.innerText);
    row.setAttribute('data-original', JSON.stringify(currentData)); // Store original data

    row.innerHTML = `
        <td><input type="number" value="${currentData[0]}" readonly></td>
        <td><input type="number" step="0.000001" value="${currentData[1]}"></td>
        <td><input type="number" step="0.000001" value="${currentData[2]}"></td>
        <td class="action-buttons">
            <button onclick="saveRow(this)">Save</button>
            <button onclick="cancelEdit(this)">Cancel</button>
        </td>
    `;
}

async function saveRow(button) {
    const row = button.closest('tr');
    const meterId = row.dataset.meterId;
    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);

    const meterData = {
        MeterID: meterId,
        Longitude: parseFloat(updatedData[1]) || 0,
        Latitude: parseFloat(updatedData[2]) || 0
    };

    try {
        const response = await fetch('https://your-api-endpoint.com/dev/update_meters_function', {
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
        
        row.innerHTML = `
            <td>${updatedData[0]}</td>
            <td>${updatedData[1]}</td>
            <td>${updatedData[2]}</td>
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

function cancelEdit(button) {
    const row = button.closest('tr');
    const originalData = JSON.parse(row.getAttribute('data-original'));

    row.innerHTML = `
        <td>${originalData[0]}</td>
        <td>${originalData[1]}</td>
        <td>${originalData[2]}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

async function deleteRow(button) {
    const row = button.closest('tr');
    const meterId = row.dataset.meterId;
    const confirmation = confirm("Are you sure you want to delete this record?");
    
    if (confirmation) {
        try {
            const response = await fetch('https://your-api-endpoint.com/dev/Delete_Meters_function', {
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
