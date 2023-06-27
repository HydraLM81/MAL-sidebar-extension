// This script will interact with the DOM on the MyAnimeList anime list page.

// Function to handle the hover event
function handleHover(event) {
  console.log("CS handleHover triggered");

  // Get the hovered anime entry element
  const animeEntry = event.target.closest('.list-table-data');

  // Get the anime details from the entry
  const titleElement = animeEntry.querySelector('.data.title');
  const descriptionElement = animeEntry.querySelector('.data.title+div');
  const scoreElement = animeEntry.querySelector('.data.score');

  // Check if the required elements exist
  if (titleElement && descriptionElement && scoreElement) {
    console.log("CS required elements exist");

    // Get the anime details
    const title = titleElement.textContent.trim();
    const description = descriptionElement.textContent.trim();
    const score = scoreElement.textContent.trim();

    // Display the sidebar with the anime details
    const sidebar = document.createElement('div');
    sidebar.id = 'mal-sidebar';
    sidebar.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
      <p>Score: ${score}</p>
    `;

    // Position the sidebar next to the hovered anime entry
    const rect = animeEntry.getBoundingClientRect();
    sidebar.style.top = `${rect.top}px`;
    sidebar.style.left = `${rect.right}px`;

    // Insert the sidebar into the page
    document.body.appendChild(sidebar);
  }
  else {
    console.log("CS required elements do NOT exist");
  }
}

// Function to remove the sidebar when the hover event ends
function removeSidebar() {
  const sidebar = document.getElementById('mal-sidebar');
  if (sidebar) {
    sidebar.remove();
  }
  console.log("CS removeSidebar triggered.")
}

// Add event listeners to detect hover events
document.addEventListener('mouseover', handleHover);
document.addEventListener('mouseout', removeSidebar);
