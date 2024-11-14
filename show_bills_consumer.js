  // Sample function to load bill data (replace with actual API call)
  async function loadBillData() {
    try {
        // Fetch bill data from the API (adjust the endpoint)
        const response = await fetch('https://your-api-endpoint');
        if (!response.ok) throw new Error('Error fetching bill data');
        
        const bills = await response.json();
        const billsContainer = document.getElementById('bills-container');
        billsContainer.innerHTML = ''; // Clear existing cards

        // If no bills are returned, show a message
        if (bills.length === 0) {
            billsContainer.innerHTML = `<p class="no-records">No bills found.</p>`;
        } else {
            bills.forEach(bill => {
                const card = document.createElement('div');
                card.classList.add('bill-card');
                
                card.innerHTML = `
                    <h3>Bill ID: ${bill.Bill_ID}</h3>
                    <p><strong>Name:</strong> ${bill.Name} ${bill.Surname}</p>
                    <div class="bill-details">
                        <div><strong>Month:</strong> ${bill.Month}</div>
                        <div><strong>Address:</strong> ${bill.Address}</div>
                        <div><strong>Consumption:</strong> ${bill.Consumption} kWh</div>
                        <div><strong>Payment:</strong> ${bill.Payment} P</div>
                    </div>
                    <div class="action-buttons">
                        <a href="${bill.BillFileUrl}" target="_blank" download>Download Bill</a>
                    </div>
                `;
                billsContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading bill data:', error);
    }
}

// Load bill data once the page is ready
document.addEventListener('DOMContentLoaded', loadBillData);