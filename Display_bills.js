// Function to load bill data from the backend
async function loadBillData() {
    try {
        const response = await fetch('https://1bbxdzgjs7.execute-api.us-east-1.amazonaws.com/prod/Display_bills_function');
        if (!response.ok) throw new Error('Error fetching bill data');

        const bills = await response.json();
        const tbody = document.querySelector('#bills-table-body');
        tbody.innerHTML = ''; // Clear existing rows

        // Populate the table with the bill data
        bills.forEach(bill => {
            const row = document.createElement('tr');
            row.dataset.billId = bill.Bill_ID; // Store Bill_ID in the row's data attribute

            row.innerHTML = `
                <td>${bill.Bill_ID || ''}</td>
                <td>${bill.Name || ''}</td>
                <td>${bill.Surname || ''}</td>
                <td>${bill.Email || ''}</td>
                <td>${bill.Month || ''}</td>
                <td>${bill.Address || ''}</td>
                <td>${bill.Consumption || ''}</td>
                <td>${bill.Payment || ''}</td>
                <td class="action-buttons-bills">
                    <button onclick="editRowBills(this)">Edit</button>
                    <button onclick="deleteRowBills(this)">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading bill data:', error);
    }
}

// Function to edit a bill row
function editRowBills(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const currentData = Array.from(cells).slice(0, -1).map(cell => cell.innerText);
    row.setAttribute('data-original', JSON.stringify(currentData)); // Store original data for cancellation

    row.innerHTML = `
        <td><input type="text" value="${currentData[0]}" readonly></td>
        <td><input type="text" value="${currentData[1]}"></td>
        <td><input type="text" value="${currentData[2]}"></td>
        <td><input type="email" value="${currentData[3]}" readonly></td>
        <td><input type="text" value="${currentData[4]}"></td>
        <td><input type="text" value="${currentData[5]}"></td>
        <td><input type="number" value="${currentData[6]}" readonly></td>
        <td><input type="number" value="${currentData[7]}" readonly></td>
        <td class="action-buttons-bills">
            <button onclick="saveRowBills(this)">Save</button>
            <button onclick="cancelEditBills(this)">Cancel</button>
        </td>
    `;
}

// Function to save changes to the bill row and update the backend
async function saveRowBills(button) {
    const row = button.closest('tr');
    const billId = row.dataset.billId;

    if (!billId) {
        console.error("Bill_ID is missing in the row dataset.");
        alert("Failed to update: Bill_ID not found.");
        return;
    }

    const inputs = row.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);

    const billData = {
        Bill_ID: billId,  // Keep Bill_ID as string or number as required
        Name: updatedData[1],
        Surname: updatedData[2],
        Email: updatedData[3], // Email is read-only
        Month: updatedData[4],
        Address: updatedData[5],
        Consumption: parseFloat(updatedData[6]) || 0, // Ensure Consumption is a number
        Payment: parseFloat(updatedData[7]) || 0 // Ensure Payment is a number
    };

    try {
        const response = await fetch('https://q9ixy3xeyi.execute-api.us-east-1.amazonaws.com/prod/Update_bills_table_function', {
            method: 'POST',
            body: JSON.stringify(billData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating bill data: ${errorText}`);
        }

        alert('Bill profile updated successfully.');

        // Update the table row with new data
        row.innerHTML = `
            <td>${billData.Bill_ID}</td>
            <td>${billData.Name}</td>
            <td>${billData.Surname}</td>
            <td>${billData.Email}</td>
            <td>${billData.Month}</td>
            <td>${billData.Address}</td>
            <td>${billData.Consumption}</td>
            <td>${billData.Payment}</td>
            <td class="action-buttons-bills">
                <button onclick="editRowBills(this)">Edit</button>
                <button onclick="deleteRowBills(this)">Delete</button>
            </td>
        `;
    } catch (error) {
        console.error('Error saving bill data:', error);
        alert('Failed to save bill data.');
    }
}

// Function to cancel editing and revert to the original bill data
function cancelEditBills(button) {
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
        <td class="action-buttons-bills">
            <button onclick="editRowBills(this)">Edit</button>
            <button onclick="deleteRowBills(this)">Delete</button>
        </td>
    `;
}

async function deleteRowBills(button) {
    const row = button.closest('tr');
    const billId = row.dataset.billId;  // Assuming `data-bill-id` is set on the row element
    const confirmation = confirm("Are you sure you want to delete this record?");

    if (confirmation) {
        try {
            const response = await fetch('https://vqwuavr9s3.execute-api.us-east-1.amazonaws.com/dev/Delete_bill_function', {
                method: 'DELETE',
                body: JSON.stringify({ 
                    Bill_ID: billId,   // Pass Bill_ID
                    type: 'bill'       // Ensure 'type' is set to 'bill'
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error deleting bill data: ${errorText}`);
            }

            alert(`Bill with ID ${billId} was deleted successfully.`);
            row.remove();  // Remove the row from the table after successful deletion
        } catch (error) {
            console.error('Error deleting bill data:', error);
            alert('Failed to delete bill data. Please try again later.');
        }
    }
}


// Load bills when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBillData();
});
