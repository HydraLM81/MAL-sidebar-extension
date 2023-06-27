// Popup script to receive anime details and handle editing options

// Get DOM elements
const animeTitleElem = document.getElementById('animeTitle');
const animeDescriptionElem = document.getElementById('animeDescription');
const animeScoreElem = document.getElementById('animeScore');
const editTitleElem = document.getElementById('editTitle');
const editDescriptionElem = document.getElementById('editDescription');
const editScoreElem = document.getElementById('editScore');
const saveButtonElem = document.getElementById('saveButton');

// Receive anime details from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'animeHovered') {
    console.log("request.action==animeHovered triggered and passed");
    animeTitleElem.textContent = request.title;
    animeDescriptionElem.textContent = request.description;
    animeScoreElem.textContent = request.score;
    editTitleElem.value = request.title;
    editDescriptionElem.value = request.description;
    editScoreElem.value = request.score;

    // Show the sidebar
    document.body.classList.add('sidebar-visible');
  }
});

// Hide the sidebar when the mouse leaves the popup
document.addEventListener('mouseleave', function() {
  document.body.classList.remove('sidebar-visible');
  console.log("mouseleave event triggered");
});

// Save button click event handler
saveButtonElem.addEventListener('click', function() {
  console.log("click event triggered");
  const editedTitle = editTitleElem.value;
  const editedDescription = editDescriptionElem.value;
  const editedScore = editScoreElem.value;

  // Perform the necessary actions with the edited data, e.g., send it to the server or update the DOM

  // Display a success message
  saveButtonElem.textContent = 'Saved!';
  setTimeout(function() {
    saveButtonElem.textContent = 'Save';
  }, 1000);

  console.log("click event finished");
});
