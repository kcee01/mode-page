async function fetchAdminProfile() {
    try {
        const response = await fetch('https://your-api-gateway-url/admin-profile'); // Replace with your API Gateway URL
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const adminData = await response.json();

        // Update the profile display with fetched data
        document.getElementById('admin-display-given-name').textContent = adminData.givenName;
        document.getElementById('admin-display-surname').textContent = adminData.surname;
        document.getElementById('admin-display-email').textContent = adminData.email;

    } catch (error) {
        console.error('Error fetching admin profile:', error);
    }
}

// Call this function when the admin profile section is shown
function showAdminProfile() {
    showForm('admin-profile'); // Show the Admin Profile section
    fetchAdminProfile(); // Fetch and display the admin profile data
}
