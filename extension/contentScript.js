function handleHover(event) {
  const animeEntry = event.target.closest('tbody.list-item');

  const titleElement = animeEntry.querySelector('.title a');
  const descriptionElement = animeEntry.querySelector('.text.notes-52034, .text:not(.notes-52034)');
  const scoreElement = animeEntry.querySelector('.score-label');
  const imageElement = animeEntry.querySelector('.image img');

  if (titleElement && titleElement.textContent) {

    /* SIDEBAR */

    const title = titleElement.textContent.trim();

    const description = descriptionElement ? descriptionElement.textContent.trim() : '';
    const formattedDescription = description.replace(/\n/g, '<br>'); // fixes newlines so they actually show in the sidebar
    const score = scoreElement ? scoreElement.textContent.trim() : '';
    const imageUrl = imageElement ? imageElement.src : '';

    // Create the sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'mal-sidebar';

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
      <p>${formattedDescription}</p>
      <p>Score: ${score}</p>
    `;


    const descriptionParagraph = sidebarContent.querySelector('p');
    const regex = /(http[s]?:\/\/[^\s]+)/g;
    descriptionParagraph.innerHTML = description.replace(regex, '<a href="$1" target="_blank">$1</a>').replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$1</a>');

    /* END OF SIDEBAR*/


    // The side menu thing
    const listMenu = document.querySelector('.list-menu-float');
    

    // Create the close button element
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.fontSize = '16px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    // Add event listener to the close button
    closeButton.addEventListener('click', removeSidebar);


    console.log('Anime Title:', title);
    console.log('Description:', description);
    console.log('Score:', score);
    console.log('Image URL:', imageUrl);


    removeSidebar();

    sidebar.appendChild(image);
    sidebar.appendChild(sidebarContent);
    sidebar.appendChild(closeButton);

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
