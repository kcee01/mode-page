async function saveAdminProfile(event) {
    event.preventDefault(); // Prevent form submission reload

    // Collect data from form fields
    const updatedProfile = {
        givenName: document.getElementById('admingivenname').value,
        surname: document.getElementById('adminsurname').value,
        address: document.getElementById('adminaddress').value,
        email: document.getElementById('adminemail').value // Email is read-only
    };

    try {
        const response = await fetch('https://na312zort3.execute-api.us-east-1.amazonaws.com/dev/save_items_function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "Profile updated successfully!");
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || "Failed to update profile");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("There was an error updating your profile. Please try again.");
    }
}

// Attach event listener to the form submit button
document.getElementById('admin-profile-form').addEventListener('submit', saveAdminProfile);
