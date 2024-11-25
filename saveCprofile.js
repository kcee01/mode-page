document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#edit-profile form').addEventListener('submit', async function handleProfileSubmit(event) {
        event.preventDefault();

        // Alert to indicate that the form submission has started
        alert("Submitting the form...");

        const updatedProfile = {
            givenName: document.getElementById('consumer-given-name').value,
            surname: document.getElementById('consumer-surname').value,
            address: document.getElementById('consumer-address').value,
            email: document.getElementById('consumer-email-address').value
        };

        // Alert to show collected profile data
        alert(`Collected profile data:\nGiven Name: ${updatedProfile.givenName}\nSurname: ${updatedProfile.surname}\nAddress: ${updatedProfile.address}\nEmail: ${updatedProfile.email}`);

        try {
            const response = await fetch('https://a5p1q0oqf3.execute-api.us-east-1.amazonaws.com/dev/Save_consumers_profile_function', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            // Alert to indicate that the request has been sent
            alert("Request sent to the server. Waiting for a response...");

            if (response.ok) {
                const result = await response.json();
                // Alert to indicate success
                alert(result.message || `Profile updated successfully! ${updatedProfile.email}`);
                document.getElementById("profile-notification").textContent = result.message || "Profile updated successfully!";
                document.getElementById("profile-notification").classList.add("success");
            } else {
                const errorResponse = await response.json();
                // Alert to indicate server-side failure
                alert(`Server returned an error: ${errorResponse.error || "Failed to update profile"}`);
                throw new Error(errorResponse.error || "Failed to update profile");
            }
        } catch (error) {
            // Alert to indicate a caught error
            alert(`Error occurred: ${error.message}`);
            console.error("Error updating profile:", error);
            document.getElementById("profile-notification").textContent = "There was an error updating your profile. Please try again.";
            document.getElementById("profile-notification").classList.add("error");
        }

        // Alert to indicate the end of form handling
        alert("Form submission process completed.");
    });
});
