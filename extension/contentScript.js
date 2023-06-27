function handleHover(event) {
  const animeEntry = event.target.closest('tbody.list-item');

  const titleElement = animeEntry.querySelector('.title a');
  const descriptionElement = animeEntry.querySelector('.text.notes-52034, .text:not(.notes-52034)');
  const scoreElement = animeEntry.querySelector('.score-label');
  const imageElement = animeEntry.querySelector('.image img');

  if (titleElement && titleElement.textContent) {
    const title = titleElement.textContent.trim();
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';
    const score = scoreElement ? scoreElement.textContent.trim() : '';
    const imageUrl = imageElement ? imageElement.src : '';

    console.log('Anime Title:', title);
    console.log('Description:', description);
    console.log('Score:', score);
    console.log('Image URL:', imageUrl);

    removeSidebar();

    // Create the sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'mal-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '300px';
    sidebar.style.padding = '10px';
    sidebar.style.background = '#fff';
    sidebar.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    sidebar.style.zIndex = '9999';

    // Create the image element
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = title;
    image.style.maxWidth = '100%';
    image.style.height = 'auto';

    // Create the sidebar content
    const sidebarContent = document.createElement('div');
    sidebarContent.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
      <p>Score: ${score}</p>
    `;

    sidebar.appendChild(image);
    sidebar.appendChild(sidebarContent);

    // Insert the sidebar into the body element
    document.body.appendChild(sidebar);

    console.log('Sidebar displayed');
  }
}

function removeSidebar() {
  const sidebar = document.getElementById('mal-sidebar');
  if (sidebar) {
    sidebar.remove();
  }
}

document.addEventListener('mouseover', handleHover);
