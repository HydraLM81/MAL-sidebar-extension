//Made by HydraLM (https://github.com/HydraLM81)

var selectedTheme = 'defaultTheme';

const themes = {
  defaultTheme: {
      topBannerBuffer: 190, //finished
      permanentBuffer: 190, //finished
      backgroundColor: 'white',//finished
      accentColor1: 'white', //finished
  },
  white: {
      backgroundColor: '#ffff00',
      accentColor1: 'purple',
  },
};


// The side menu thing
const listMenu = document.querySelector('.list-menu-float');
//bottom of page    window.innerHeight - listMenu.offsetHeight + 'px';
listMenu.style.top = themes[selectedTheme]['topBannerBuffer'];


const listContainer = document.querySelector('.list-container');
var windowWidth = window.innerWidth;
var listBlockWidth = listContainer.offsetWidth;
var freeArea = windowWidth - listBlockWidth;

listMenu.style.left = `${(freeArea / 2) + listBlockWidth}px`;


document.addEventListener('mouseover', handleHover);
function handleHover(event) {

  const animeEntry = event.target.closest('tbody.list-item');

  if(animeEntry.querySelector('.title a')){
    const titleElement = animeEntry.querySelector('.title a');

    if (titleElement && titleElement.textContent) {

      /* SIDEBAR */

      // Create the sidebar container
      var sidebar = document.createElement('div');
      sidebar.id = 'mal-sidebar';
      sidebar.style.backgroundColor = themes[selectedTheme]['backgroundColor'];
      console.log("scroll is ", window.scrollY);

      /*
        SIDEBAR WIDTH
      */
    
      const windowWidth = window.innerWidth;
      const listContainer = document.querySelector('.list-container');
      const listBlockWidth = listContainer.offsetWidth;
      const freeArea = windowWidth - listBlockWidth;
      const sidebarWidth = (freeArea / 2) - 30;

      sidebar.style.width = `${Math.max(sidebarWidth, (window.innerWidth*.05))}px`;
      
      if(sidebarWidth < window.innerWidth*.05) {
        sidebar.style.opacity = `.75`;
      } else {
        sidebar.style.opacity = `1`;
      }
    

      // Create the sidebar content
      const sidebarContent = document.createElement('div');
      sidebarContent.id = `sidebar-content`;

      const animeLink = animeEntry.querySelector('.data.title.clearfix a');
      const imageElement = animeEntry.querySelector('.image img');
      const imageUrl = imageElement ? imageElement.src : '';
      const title = titleElement.textContent.trim();
      const airElement = animeEntry.querySelector('.content-status');

      const animeId = animeLink.href.match(/\/anime\/(\d+)\//)[1];

      sidebarContent.innerHTML = `
        <a href="${animeLink.href}">
          <img src="${imageUrl}" alt="${title}" class="anime-image" width="${Math.min((Math.max((sidebarWidth - 40), (window.innerWidth * .04))), window.innerWidth * .15)}">
          <h2>${title}</h2>
          <h1>${airElement.textContent.trim()}</h1>
        </a>`;

      console.log('Anime Title:', title);
      console.log('Image URL:', imageUrl);


      const descriptionElement = animeEntry.querySelector('.text.notes-52034, .text:not(.notes-52034)');
      if(descriptionElement.textContent != null) {
        var description = descriptionElement ? descriptionElement.textContent.trim() : '';
        const regex = /(http[s]?:\/\/[^\s]+)/g;
        description = description.replace(regex, '<a href="$1" target="_blank">$1</a>').replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$1</a>');
        const formattedDescription = description.replace(/\n/g, '<br>'); // fixes newlines so they actually show in the sidebar
        sidebarContent.innerHTML+=`<p1>${formattedDescription}</p1><br>`;
        console.log('Description:', description);
      }

      const editLink = animeEntry.querySelector('.add-edit-more .edit a');
      if(editLink.href != null) {
        sidebarContent.innerHTML+=`<a href="${editLink.href}" class="edit-link">Edit</a><br>`;
        
      }

      const scoreElement = animeEntry.querySelector('.score-label');
      const score = scoreElement ? scoreElement.textContent.trim() : '';
      if(score != null) {
        sidebarContent.innerHTML+=`<p2 class="score-text">Score: ${score}/10</p2><br>`;
        console.log('Score:', score);
      }

      const typeElement = animeEntry.querySelector('.data.type');
      if(typeElement.textContent != null) {
        sidebarContent.innerHTML+=`<p3 class="type-text">Type: ${typeElement.textContent}</p3>`;
      }


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


      removeSidebar();

      sidebar.appendChild(sidebarContent);
      sidebar.appendChild(closeButton);

      // Insert the sidebar into the body element
      document.body.appendChild(sidebar);

      updateStyleTop()
    }
  }
}


function removeSidebar() {
  const sidebar = document.getElementById('mal-sidebar');
  if (sidebar) {
    sidebar.remove();
  }
}

window.addEventListener('resize', updateWidthDependancies);

function updateWidthDependancies(){
  windowWidth = window.innerWidth;
  listBlockWidth = listContainer.offsetWidth;
  freeArea = windowWidth - listBlockWidth;

  listMenu.style.left = `${(freeArea / 2) + listBlockWidth}px`;

  const sidebar = document.getElementById('mal-sidebar');

  if(sidebar) {
    const sidebarWidth = (freeArea / 2) - 30;
    sidebar.style.width = `${Math.min((Math.max(sidebarWidth, (window.innerWidth * .05))), window.innerWidth * .2)}px`;

    const imageElement = sidebar.querySelector('.anime-image');

    if (imageElement) {
      imageElement.style.width = `${Math.min((Math.max((sidebarWidth - 40), (window.innerWidth * .04))), window.innerWidth * .15)}px`;
    }
    
    if(sidebarWidth < window.innerWidth*.05){
      sidebar.style.opacity = `.75`;
    } else {
      sidebar.style.opacity = `1`;
    }
  }
}

window.addEventListener('scroll', updateStyleTop);

function updateStyleTop() {
  const sidebar = document.getElementById('mal-sidebar');
  const buffer = themes[selectedTheme]['topBannerBuffer']; // Distance in pixels from the top of the page
  const scrollTop = window.scrollY;
  const permaBuffer = themes[selectedTheme]['permanentBuffer'];
 
  if(buffer == permaBuffer){
    sidebar.style.top = `${permaBuffer}px`;
    listMenu.style.top = `${permaBuffer}px`;
  } else if (scrollTop >= buffer - permaBuffer) {
    sidebar.style.top = `${permaBuffer}px`;
    listMenu.style.top = `${permaBuffer}px`;
  } else {
    sidebar.style.top = `${buffer - scrollTop}px`;
    listMenu.style.top = `${buffer - scrollTop}px`;
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'updateTheme') {
    selectedTheme = message.selectedTheme;
  }
});

