async function handleImageUpload(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image-file');
    const notification = document.getElementById("upload-notification");
    const consumerEmail = document.getElementById('consumer-email').value;  // Retrieve email from the form

    if (fileInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
        const base64Data = reader.result.split(',')[1];
        const fileExtension = file.name.split('.').pop();

        const payload = {
            email: consumerEmail,  // Use email as identifier
            image_data: base64Data,
            file_extension: fileExtension
        };

        try {
            const response = await fetch('https://your-api-url.execute-api.us-east-1.amazonaws.com/dev/upload_image_function', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                notification.textContent = result.message || "Image uploaded successfully!";
                notification.classList.add("success");
            } else {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            notification.textContent = "There was an error uploading your image. Please try again.";
            notification.classList.add("error");
        }
    };
}
