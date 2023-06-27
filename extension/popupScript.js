// Get DOM elements
const themeSelect = document.getElementById('themeSelect');

// Retrieve the selected theme from local storage
chrome.storage.local.get('selectedTheme', function(result) {
  const selectedTheme = result.selectedTheme || 'default';
  themeSelect.value = selectedTheme;

  // Send a message to the content script to update the theme
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const message = {
      action: 'updateTheme',
      selectedTheme,
    };
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});

// Theme select change event handler
themeSelect.addEventListener('change', function(event) {
  const selectedTheme = event.target.value;

  // Store the selected theme in local storage
  chrome.storage.local.set({ selectedTheme });
  console.log('Theme changed to ',selectedTheme);

  // Send a message to the content script to update the theme
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const message = {
      action: 'updateTheme',
      selectedTheme,
    };
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});
