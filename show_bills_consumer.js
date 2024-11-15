async function loadBillData() {
    try {
        const response = await fetch('https://1bbxdzgjs7.execute-api.us-east-1.amazonaws.com/prod/Display_bills_function');
        if (!response.ok) throw new Error('Error fetching bill data');

        const bills = await response.json();
        const billsContainer = document.getElementById('bills-container');
        billsContainer.innerHTML = ''; // Clear existing cards

        if (bills.length === 0) {
            billsContainer.innerHTML = `<p class="no-records">No bills found.</p>`;
        } else {
            bills.forEach(bill => {
                const card = document.createElement('div');
                card.classList.add('bill-card');
                
                // Populate bill card with details
                card.innerHTML = `
                    <h3>Bill ID: ${bill.Bill_ID}</h3>
                    <p><strong>Name:</strong> ${bill.Name} ${bill.Surname}</p>
                    <div class="bill-details">
                        <div><strong>Month:</strong> ${bill.Month}</div>
                        <div><strong>Address:</strong> ${bill.Address}</div>
                        <div><strong>Consumption:</strong> ${bill.Consumption} kWh</div>
                        <div><strong>Payment:</strong> P ${bill.Payment}</div>
                    </div>
                    <div class="action-buttons">
                        <button onclick="downloadPDF(${JSON.stringify(bill).replace(/"/g, '&quot;')})">Download Bill</button>
                    </div>
                `;
                billsContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading bill data:', error);
    }
}

function downloadPDF(bill) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(20, 30, `Bill ID: ${bill.Bill_ID}`);
    doc.text(20, 40, `Consumer: ${bill.Name} ${bill.Surname}`);
    doc.text(20, 50, `Month: ${bill.Month}`);
    doc.text(20, 60, `Address: ${bill.Address}`);
    doc.text(20, 70, `Consumption: ${bill.Consumption} kWh`);
    doc.text(20, 80, `Payment: P ${bill.Payment}`);

    doc.save(`Bill_${bill.Bill_ID}_${bill.Month}.pdf`);
}

document.addEventListener('DOMContentLoaded', loadBillData);