//Made by HydraLM (https://github.com/HydraLM81)

// The side menu thing
const listMenu = document.querySelector('.list-menu-float');
//bottom of page
const windowHeight = window.innerHeight;
const divHeight = listMenu.offsetHeight;
const topValue = windowHeight - divHeight + 'px';
listMenu.style.top = topValue;

var selectedTheme = 'defaultTheme';

const themes = {
  defaultTheme: {
      backgroundColor: 'white',
      accentColor1: 'blue',
  },
  white: {
      backgroundColor: '#ffff00',
      accentColor1: 'purple',
  },
};

function handleHover(event) {
  const animeEntry = event.target.closest('tbody.list-item');
  if(animeEntry.querySelector('.title a')){
    const titleElement = animeEntry.querySelector('.title a');
    const airElement = animeEntry.querySelector('.content-status');
    const descriptionElement = animeEntry.querySelector('.text.notes-52034, .text:not(.notes-52034)');
    const scoreElement = animeEntry.querySelector('.score-label');
    const imageElement = animeEntry.querySelector('.image img');
    const animeLink = animeEntry.querySelector('.data.title.clearfix a');
    const animeUrl = animeLink.href;
    const editLink = animeEntry.querySelector('.add-edit-more .edit a');
    const editUrl = editLink.href;

    if (titleElement && titleElement.textContent) {

      /* SIDEBAR */

      const title = titleElement.textContent.trim();
      const airStatus = airElement.textContent.trim();
      const description = descriptionElement ? descriptionElement.textContent.trim() : '';
      const formattedDescription = description.replace(/\n/g, '<br>'); // fixes newlines so they actually show in the sidebar
      const score = scoreElement ? scoreElement.textContent.trim() : '';
      const imageUrl = imageElement ? imageElement.src : '';


      // Create the sidebar container
      var sidebar = document.createElement('div');
      sidebar.id = 'mal-sidebar';
      sidebar.style.background = themes[selectedTheme]['backgroundColor'];

      // Create the sidebar content
      const sidebarContent = document.createElement('div');
      sidebarContent.innerHTML = `
        <a href="${animeUrl}">
          <img src="${imageUrl}" alt="${title}" class="anime-image">
          <h2>${title}</h2>
          <h1>${airStatus}</h1> <br><br>
        </a>`;

        if(formattedDescription!=null) {
          sidebarContent.innerHTML+=`<p1>${formattedDescription}</p1><br><br><br>`;
        }
        if(score!=null) {
          sidebarContent.innerHTML+=`<p2>Score: ${score}/10</p2> <br><br>`;
        }
        if(editUrl!=null) {
          sidebarContent.innerHTML+=`<a href="${editUrl}" class="edit-link">Edit</a>`;
        }


      const descriptionParagraph = sidebarContent.querySelector('p1'); // Update tag if it's changed above
      const regex = /(http[s]?:\/\/[^\s)]+)/g;
      descriptionParagraph.innerHTML = description.replace(regex, '<a href="$1" target="_blank">$1</a>').replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$2</a>');


      /* END OF SIDEBAR*/
      

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

      sidebar.appendChild(sidebarContent);
      sidebar.appendChild(closeButton);

      // Insert the sidebar into the body element
      document.body.appendChild(sidebar);

      //move side menu to right of sidebar
      const listMenuFloat = document.querySelector('.list-menu-float');
      if (listMenuFloat) {
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        listMenuFloat.style.left = `${sidebarWidth}px`;
      }

      console.log('Sidebar displayed');
    }
  }
}

function removeSidebar() {
  const sidebar = document.getElementById('mal-sidebar');
  if (sidebar) {
    sidebar.remove();
    listMenu.style.left = '0px';
  }
}

document.addEventListener('mouseover', handleHover);



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'updateTheme') {
    selectedTheme = message.selectedTheme;
  }
});