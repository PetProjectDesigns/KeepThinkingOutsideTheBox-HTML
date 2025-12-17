// BEGINNER NOTE: This array holds the different quotes we want to cycle through.
const quotes = [
    "The best way to predict the future is to create it.",
    "Simplicity is the ultimate sophistication.",
    "Have nothing in your houses that you do not know to be useful, or believe to be beautiful.",
    "Strive for progress, not perfection."
];

// BEGINNER NOTE: A variable to keep track of which quote is currently displayed.
let currentQuoteIndex = 0;

/**
 * FUNCTION: changeQuote()
 * This function updates the text content of an HTML element every time it's called.
 */
function changeQuote() {
    // BEGINNER NOTE: document.getElementById() is how JavaScript "finds" an element in the HTML.
    const outputElement = document.getElementById('js-output');
    
    // LOGIC: Get the next quote in the array.
    // The modulo operator (%) ensures the index wraps back to 0 when it reaches the end of the array.
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    
    const newQuote = quotes[currentQuoteIndex];

    // DOM MANIPULATION: Update the text content of the element.
    outputElement.textContent = newQuote;

    // Optional: Also update the style to show a change
    outputElement.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`; 
    // BEGINNER NOTE: This line generates a random hex color code for fun!
    
    // You could also use a simpler, fixed color change:
    // outputElement.style.fontWeight = 'bold';
}

// BEGINNER NOTE: This part ensures that the initial quote section is hidden 
// once the user starts interacting with the JS element, if you wanted to do that.
// For this simple example, we'll just let the JS element update its own text.

// ADVANCED NOTE: You could also use an event listener instead of the 'onclick' attribute:
/*
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.js-interaction-item button');
    button.addEventListener('click', changeQuote);
});
*/