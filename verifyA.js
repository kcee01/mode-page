
        function handleVerification(event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            // You can perform any processing or validation here
            console.log('Form Data:', data);

            // Display verification notification
            const notification = document.getElementById('verification-notification');
            notification.innerHTML = ''; // Clear previous notifications

            // Simulate verification process
            setTimeout(() => {
                // Here you can handle successful verification logic
                if (data.email.includes('@')) { // Example check
                    notification.className = 'notification success';
                    notification.innerHTML = 'Verification successful!';
                } else {
                    notification.className = 'notification';
                    notification.innerHTML = 'Verification failed. Please check your input.';
                }
            }, 1000); // Simulated delay for verification

            return false; // Prevent form from submitting to server
        }
    