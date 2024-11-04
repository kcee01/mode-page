
let currentRow = null;

// Function to edit a row
function editRow(button) {
    // Get the current row to edit
    currentRow = button.closest('tr');
    
    // Extract current data
    const cells = currentRow.querySelectorAll('td');
    const data = Array.from(cells).slice(0, -1).map(cell => cell.innerText); // Exclude the last cell with buttons

    // Create input fields to allow editing
    currentRow.innerHTML = `
        <td><input type="text" value="${data[0]}" class="input-given-name"></td>
        <td><input type="text" value="${data[1]}" class="input-surname"></td>
        <td><input type="text" value="${data[2]}" class="input-address"></td>
        <td><input type="text" value="${data[3]}" class="input-meter-id"></td>
        <td><input type="email" value="${data[4]}" class="input-email" readonly></td>
        <td><select class="input-enabled"><option value="Yes" ${data[5] === "Yes" ? 'selected' : ''}>Yes</option><option value="No" ${data[5] === "No" ? 'selected' : ''}>No</option></select></td>
        <td><input type="text" value="${data[6]}" class="input-date"></td>
        <td><input type="number" value="${data[7]}" class="input-year"></td>
        <td><input type="number" value="${data[8]}" class="input-month"></td>
        <td><input type="text" value="${data[9]}" class="input-meter-reading"></td>
        <td><input type="text" value="${data[10]}" class="input-image-file-name"></td>
        <td><input type="text" value="${data[11]}" class="input-bill-file-name"></td>
        <td><input type="text" value="${data[12]}" class="input-enabled-by-admin"></td>
        <td class="action-buttons">
            <button onclick="saveRow(this)">Save</button>
            <button onclick="cancelEdit(this)">Cancel</button>
        </td>
    `;
}

// Function to save changes
function saveRow(button) {
    const row = button.closest('tr');

    // Gather updated values
    const newData = [
        row.querySelector('.input-given-name').value,
        row.querySelector('.input-surname').value,
        row.querySelector('.input-address').value,
        row.querySelector('.input-meter-id').value,
        row.querySelector('.input-email').value,
        row.querySelector('.input-enabled').value,
        row.querySelector('.input-date').value,
        row.querySelector('.input-year').value,
        row.querySelector('.input-month').value,
        row.querySelector('.input-meter-reading').value,
        row.querySelector('.input-image-file-name').value,
        row.querySelector('.input-bill-file-name').value,
        row.querySelector('.input-enabled-by-admin').value
    ];

    // Update the row with new data
    row.innerHTML = `
        <td>${newData[0]}</td>
        <td>${newData[1]}</td>
        <td>${newData[2]}</td>
        <td>${newData[3]}</td>
        <td>${newData[4]}</td>
        <td>${newData[5]}</td>
        <td>${newData[6]}</td>
        <td>${newData[7]}</td>
        <td>${newData[8]}</td>
        <td>${newData[9]}</td>
        <td>${newData[10]}</td>
        <td>${newData[11]}</td>
        <td>${newData[12]}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

// Function to cancel editing
function cancelEdit(button) {
    // Reset the row to its original state
    if (currentRow) {
        const originalData = Array.from(currentRow.children).slice(0, -1).map(cell => cell.innerText);
        currentRow.innerHTML = `
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
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest('tr');
    const confirmation = confirm("Are you sure you want to delete this record?");
    if (confirmation) {
        row.remove();
    }
}

// Example function to show a form for adding a new consumer
function showForm(formId) {
    // Your logic to display the form for adding a new consumer
    alert('Show form functionality not implemented yet.');
}
