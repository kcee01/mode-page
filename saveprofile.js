// Function to save edited admin profile data
async function saveAdminProfile() {
    const updatedProfile = {
        givenName: document.getElementById('admingivenname').value,
        surname: document.getElementById('adminsurname').value,
        address: document.getElementById('adminaddress').value,
        email: document.getElementById('adminemail').value // Email remains read-only
    };

    try {
        const response = await fetch('https://yiykq4m8n3.execute-api.us-east-1.amazonaws.com/prod/save_profile_function', {
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

// Attach event listener to the Save button
document.getElementById('save-profile-button').addEventListener('click', saveAdminProfile);
