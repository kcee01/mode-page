async function handleProfileSubmit(event) {
    event.preventDefault(); // Prevent form submission reload

    // Collect data from form fields
    const updatedProfile = {
        givenName: document.getElementById('consumer-given-name').value,
        surname: document.getElementById('Consumer-surname').value,
        address: document.getElementById('consumer-address').value,
        email: document.getElementById('consumer-email-address').value
    };


        // Alert to check data collection
        alert("Collected profile data: " + JSON.stringify(email));


    try {
        const response = await fetch('https://a5p1q0oqf3.execute-api.us-east-1.amazonaws.com/dev/Save_consumers_profile_function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "Profile updated successfully! " + email ); 
            document.getElementById("profile-notification").textContent = result.message || "Profile updated successfully!";
            document.getElementById("profile-notification").classList.add("success");
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || "Failed to update profile");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        document.getElementById("profile-notification").textContent = "There was an error updating your profile. Please try again.";
        document.getElementById("profile-notification").classList.add("error");
    }
}

// Attach event listener to the form submit button
document.getElementById('edit-profile').addEventListener('submit', handleProfileSubmit);
