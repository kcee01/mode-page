


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
                        <div><strong>Email:</strong> ${bill.Email}</div>
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
    doc.text(20, 50, `Email: ${bill.Email}`);
    doc.text(20, 60, `Month: ${bill.Month}`);
    doc.text(20, 70, `Address: ${bill.Address}`);
    doc.text(20, 80, `Consumption: ${bill.Consumption} kWh`);
    doc.text(20, 90, `Payment: P ${bill.Payment}`);

    const pdfFileName = `Bill_${bill.Bill_ID}_${bill.Month}.pdf`;
    doc.save(pdfFileName);

    // Call function to update the Consumers table
    updateBillFileName(bill.Email, pdfFileName);
}

async function updateBillFileName(email, pdfFileName) {
    try {
        const payload = { email, BillFileName: pdfFileName }; // Construct payload
        console.log('Payload being sent to API:', payload); // Debugging payload

        const response = await fetch('https://2khyj7b1i4.execute-api.us-east-1.amazonaws.com/dev/Update_Bill_name_function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('API Response Status:', response.status); // Log response status
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error Response from API:', errorResponse); // Log error response
            throw new Error(errorResponse.error || 'Failed to update BillFileName');
        }

        console.log('BillFileName updated successfully in the Consumers table.');
    } catch (error) {
        console.error('Error updating BillFileName:', error); // Log error in console
    }
}
document.addEventListener('DOMContentLoaded', loadBillData);
