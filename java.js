$(document).ready(function () {
    // Listen for button clicks
    $("button[data-toggle='collapse']").click(function () {
      console.log("Button clicked: " + $(this).data("target"));
      // Collapse all card containers
      $("div[id^='linkContent']").collapse("hide");
  
      // Expand the card container associated with the clicked button
      $($(this).data("target")).collapse("show");
    });
  });
  
 