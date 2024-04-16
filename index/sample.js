

// Get the modal
var modal = document.getElementById('termsModal');

// Function to display the modal
function showTerms() {
  modal.style.display = "block";
}

// Function to close the modal when clicking on the close button
function closeModal() {
  modal.style.display = "none";
}

// Function to close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function triggered when "I Agree" button is clicked
function agree() {
  alert ("You have agreed to the terms and conditions!");
}
