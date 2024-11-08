document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.navbar');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            // Desmarca todas as outras checkboxes ao marcar uma nova
            if (this.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });
});




