document.getElementById("consumer-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    
    // Collect form data
  // Collect form data
const consumerData = {
    givenName: document.getElementById("consumer-given-name").value,
    Surname: document.getElementById("consumer-surname").value,
    Address: document.getElementById("consumer-address").value,
    electricMeterId: document.getElementById("electric-meter-id").value,
    email: document.getElementById("email").value,
    consumerSecret: document.getElementById("consumer-secret").value,
    enabled: document.getElementById("enabled").value,
    consumerDOC: document.getElementById("consumer-DOC").value,
    year: document.getElementById("year").value,
    month: document.getElementById("month").value,
    meterReading: document.getElementById("meter-reading").value,
    imageFile: document.getElementById("image-file").value,
    billFile: document.getElementById("bill-file").value,
    enabledByAdmin: document.getElementById("enabledByAdmin").value
};

    
    try {
        // Send POST request to the API Gateway
        const response = await fetch("https://xrj42z99ek.execute-api.us-east-1.amazonaws.com/prod/Add_Consumers_funtion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consumerData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message); // Success message
        } else {
            alert("Error: " + (result.error || "Failed to add consumer"));
        }
    } catch (error) {
        console.error("Request failed", error);
        alert("An unexpected error occurred");
    }
});
