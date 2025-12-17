const toggleButton = document.getElementById('mode-toggle');
const body = document.body;

// Function to set the theme
function setTheme(theme) {
    if (theme === 'dark-mode') {
body.classList.add('dark-mode');
toggleButton.innerHTML = '<span class="material-icons">dark_mode</span>';
localStorage.setItem('theme', 'dark-mode');
    } else {
body.classList.remove('dark-mode');
toggleButton.innerHTML = '<span class="material-icons">light_mode</span>';
localStorage.setItem('theme', 'light-mode');
    }
}

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Default to system preference if no saved theme
    setTheme('dark-mode');
} else {
     setTheme('light-mode');
}

// Event listener for the toggle button
toggleButton.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(isDarkMode ? 'light-mode' : 'dark-mode');
});
