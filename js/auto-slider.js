console.log("JavaScript file loaded");

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');

    // Loop through each slider
    sliders.forEach((slider) => {
        let currentIndex = 0; // Track the current slide index
        const slides = slider.querySelectorAll('.slides img'); // Select all slide images
        const prevButton = slider.querySelector('.prev'); // Select the previous button
        const nextButton = slider.querySelector('.next'); // Select the next button
        let autoSlideInterval; // Variable to store the auto-slide interval
        const autoSlideDelay = 7000; // Time between automatic slide changes
        const userInteractionDelay = 10000; // Time to wait before resuming auto-slide after user interaction

        // Function to show the slide at the given index
        function showSlide(index) {
            // Wrap around if index is out of bounds
            if (index >= slides.length) currentIndex = 0; 
            else if (index < 0) currentIndex = slides.length - 1; 
            else currentIndex = index;

            // Calculate and apply the translation to show the current slide
            const newTranslateValue = -currentIndex * 100; 
            slider.querySelector('.slides').style.transform = `translateX(${newTranslateValue}%)`; 
        }

        // Change the slide based on direction (-1 for previous, +1 for next)
        function changeSlide(direction) {
            showSlide(currentIndex + direction); 
            resetAutoSlide(); // Reset the auto-slide timer
        }

        // Start the automatic slide show
        function startAutoSlide() {
            clearInterval(autoSlideInterval); // Clear any existing intervals
            autoSlideInterval = setInterval(() => {
                showSlide(currentIndex + 1); // Show the next slide
            }, autoSlideDelay);
        }

        // Reset the auto-slide timer after user interaction
        function resetAutoSlide() {
            clearInterval(autoSlideInterval); // Clear the current interval
            setTimeout(startAutoSlide, userInteractionDelay); // Restart after a delay
        }

        // Event listeners for the previous and next buttons
        prevButton.addEventListener('click', () => changeSlide(-1)); 
        nextButton.addEventListener('click', () => changeSlide(1)); 

        showSlide(currentIndex); // Show the initial slide
        startAutoSlide(); // Start the auto-slide
    });
});
