document.getElementById('admin-button').addEventListener('click', function() {
    document.body.style.backgroundColor = '#007bff';
    alert('Admin mode selected');
});

document.getElementById('customer-button').addEventListener('click', function() {
    document.body.style.backgroundColor = '#28a745';
    alert('Customer mode selected');
});
