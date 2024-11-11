
  function confirmReading() {
    // Call the API to save the OCR-detected reading
    const reading = document.getElementById('ocrReading').value;
    alert(`Confirmed reading: ${reading}`);
    // Here you would make an API call to save the confirmed reading
}

function rejectReading() {
    // Show manual entry field
    document.getElementById('manualEntryGroup').style.display = 'block';
}

function submitManualReading() {
    // Get the manually entered reading
    const manualReading = document.getElementById('manualReading').value;
    if (manualReading) {
        alert(`Manual reading submitted: ${manualReading}`);
        // Here you would make an API call to save the manual reading
    } else {
        alert("Please enter a valid reading.");
    }
}
