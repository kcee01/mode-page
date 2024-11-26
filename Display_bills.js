async function loadBillData() {
    try {
        // Call the API to fetch bill data from Lambda
        const response = await fetch('https://1bbxdzgjs7.execute-api.us-east-1.amazonaws.com/prod/Display_bills_function');
        
        if (!response.ok) throw new Error('Error fetching bill data');
        
        // Parse the JSON response from the API
        const bills = await response.json();
        
        const tbody = document.querySelector('#bills-table-body');
        tbody.innerHTML = ''; // Clear existing rows

        // Populate the table with the bill data
        bills.forEach(bill => {
            const row = document.createElement('tr');
            row.dataset.billId = bill.Bill_ID;
            row.innerHTML = `
                <td>${bill.Bill_ID || ''}</td>
                <td>${bill.Name || ''}</td>
                <td>${bill.Surname || ''}</td>
                <td>${bill.Email || ''}</td>
                <td>${bill.Month || ''}</td>
                <td>${bill.Address || ''}</td>
                <td>${bill.Consumption || ''}</td>
                <td>${bill.Payment || ''}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading bill data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadBillData(); // Load bills when the page is loaded
});
