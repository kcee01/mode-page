document.getElementById("consumer-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
        givenName: document.getElementById("consumer-given-name").value,
        surname: document.getElementById("consumer-surname").value,
        address: document.getElementById("consumer-address").value,
        electricMeterId: document.getElementById("electric-meter-id").value,
        email: document.getElementById("consumer-email").value,
        secret: document.getElementById("consumer-secret").value,
        enabled: document.getElementById("enabled").value === "yes",
        dateOfCreation: document.getElementById("consumer-DOC").value,
        year: parseInt(document.getElementById("year").value),
        month: document.getElementById("month").value,
        meterReading: parseFloat(document.getElementById("meter-reading").value),
        imageFile: document.getElementById("image-file").value,
        billFile: document.getElementById("bill-file").value,
        enabledByAdmin: document.getElementById("enabledByAdmin").value === "yes"
    };

    try {
        const response = await fetch("https://sxgzj2lddj.execute-api.us-east-1.amazonaws.com/dev/Add_Consumers_funtion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();
        alert("Consumer added successfully!");
    } catch (error) {
        console.error("Error adding consumer:", error);
        alert("Failed to add consumer.");
    }
});
