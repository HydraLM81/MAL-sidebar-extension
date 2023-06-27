// Content script to handle hover events on anime entries and send data to the popup

// Listener for hover events on anime entries
document.addEventListener('mouseover', function(event) {
  const animeEntry = event.target.closest('.list-table-data');

  if (animeEntry) {
    const animeTitleElem = animeEntry.querySelector('.animetitle');
    const animeDescriptionElem = animeEntry.querySelector('.pt4');
    const animeScoreElem = animeEntry.querySelector('.score .score-label');

    // Check if the elements are found in the DOM
    if (animeTitleElem && animeDescriptionElem && animeScoreElem) {
      const animeTitle = animeTitleElem.textContent.trim();
      const animeDescription = animeDescriptionElem.textContent.trim();
      const animeScore = animeScoreElem.textContent.trim();

      // Send anime details to the extension popup
      chrome.runtime.sendMessage({
        action: 'animeHovered',
        title: animeTitle,
        description: animeDescription,
        score: animeScore
      });
    }
  }
});
