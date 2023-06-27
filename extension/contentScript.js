// Content script to handle hover events on anime entries and send data to the popup

// Listener for hover events on anime entries
document.addEventListener('mouseover', function(event) {
    const animeEntry = event.target.closest('.list-table-data');
  
    if (animeEntry) {
      const animeTitle = animeEntry.querySelector('.animetitle').textContent.trim();
      const animeDescription = animeEntry.querySelector('.pt4').textContent.trim();
      const animeScore = animeEntry.querySelector('.score .score-label').textContent.trim();
  
      // Send anime details to the extension popup
      chrome.runtime.sendMessage({
        action: 'animeHovered',
        title: animeTitle,
        description: animeDescription,
        score: animeScore
      });
    }
  });
  