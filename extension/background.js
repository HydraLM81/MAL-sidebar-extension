// This is a simple example of a background script that logs a message when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install") {
    console.log("Extension installed");
  } else if (details.reason === "update") {
    console.log("Extension updated");
  }
});

// Other background script logic can be added here
