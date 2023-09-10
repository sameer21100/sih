document.addEventListener("DOMContentLoaded", function() {
    const colorButton = document.getElementById("colorButton");
  
    // Define an array of possible button colors
    const buttonColors = ["btn-primary", "btn-violet"];
    let currentColorIndex = 0;
  
    colorButton.addEventListener("click", function() {
      // Toggle between colors
      currentColorIndex = 1 - currentColorIndex; // Toggle between 0 and 1
      const nextColor = buttonColors[currentColorIndex];
  
      // Remove all colors and set the next color
      colorButton.classList.remove(...buttonColors);
      colorButton.classList.add(nextColor);
    });
  });
  