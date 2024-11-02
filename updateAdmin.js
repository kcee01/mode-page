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

// Call fetchAdminProfile when the page loads or section is shown
fetchAdminProfile();
