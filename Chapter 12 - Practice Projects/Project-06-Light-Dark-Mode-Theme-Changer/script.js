document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
        const modeLabel = document.querySelector('label[for="darkModeToggle"]');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Function to update label text
    const updateModeLabel = () => {
        modeLabel.textContent = document.body.classList.contains('dark-mode') 
            ? 'Dark Mode' 
            : 'Light Mode';
    };
    
    // Apply dark mode if previously set
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        updateModeLabel();
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', null);
        }
        
        // Update label text after toggling
        updateModeLabel();
    });
});