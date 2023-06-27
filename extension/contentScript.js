function handleHover(event) {
  const animeEntry = event.target.closest('tbody.list-item');

  const titleElement = animeEntry.querySelector('.title a');
  const descriptionElement = animeEntry.querySelector('.text.notes-52034, .text:not(.notes-52034)');
  const scoreElement = animeEntry.querySelector('.score-label');

  if (titleElement && titleElement.textContent) {
    const title = titleElement.textContent.trim();
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';
    const score = scoreElement ? scoreElement.textContent.trim() : '';

    console.log('Anime Title:', title);
    console.log('Description:', description);
    console.log('Score:', score);

    // Create the sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'mal-sidebar';
    sidebar.classList.add('sidebar');

    // Create the sidebar content
    const titleHeader = document.createElement('h2');
    titleHeader.textContent = title;
    titleHeader.classList.add('sidebar-title');

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = description;
    descriptionPara.classList.add('sidebar-description');

    const scorePara = document.createElement('p');
    scorePara.textContent = 'Score: ' + score;
    scorePara.classList.add('sidebar-score');

    // Append the content to the sidebar
    sidebar.appendChild(titleHeader);
    sidebar.appendChild(descriptionPara);
    sidebar.appendChild(scorePara);

    // Insert the sidebar into the page
    document.body.appendChild(sidebar);
  }
}

function removeSidebar() {
  const sidebar = document.getElementById('mal-sidebar');
  if (sidebar) {
    sidebar.remove();
  }
}

document.addEventListener('mouseover', handleHover);
document.addEventListener('mouseout', removeSidebar);
