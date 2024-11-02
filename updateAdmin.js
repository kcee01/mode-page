// Fetch and display admin profile data
async function fetchAdminProfile() {
    try {
        const response = await fetch('https://oypjcbf6pk.execute-api.us-east-1.amazonaws.com/dev/get_admin_function'); // Replace with your actual API Gateway URL
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        const adminData = data[0];  // Access the first item in the returned array
        
        // Update the form fields with fetched data
        document.getElementById('admingivenname').value = adminData.givenName;
        document.getElementById('adminsurname').value = adminData.surname;
        document.getElementById('adminemail').value = adminData.email;
        document.getElementById('adminaddress').value = adminData.address;

    } catch (error) {
        console.error('Error fetching admin profile:', error);
    }
}

// Save edited admin profile data
async function saveAdminProfile() {
    const updatedProfile = {
        givenName: document.getElementById('admingivenname').value,
        surname: document.getElementById('adminsurname').value,
        address: document.getElementById('adminaddress').value,
        email: document.getElementById('adminemail').value // Email remains read-only
    };

    try {
        const response = await fetch('https://oypjcbf6pk.execute-api.us-east-1.amazonaws.com/dev/update_admin_function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
            alert("Profile updated successfully!");
        } else {
            throw new Error("Failed to update profile");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("There was an error updating your profile. Please try again.");
    }
}

// Show the profile section and load data only when it's visible
document.getElementById('admin-profile').addEventListener('click', fetchAdminProfile);
