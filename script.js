document.addEventListener('DOMContentLoaded', function() {
    const welcomeDiv = document.getElementById('welcome');
    const landingPageDiv = document.getElementById('quiz');
    const enterButton = document.getElementById('enterButton');

    enterButton.addEventListener('click', function() {
        // Hides the welcome entry message
        welcomeDiv.style.display = 'none';
        // This shows the landing page after clicking Enter Button
        landingPageDiv.style.display = 'block';
    })
})