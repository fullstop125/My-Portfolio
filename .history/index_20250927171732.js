document.addEventListener('DOMContentLoaded', () => {
  // --- Original Menu Logic (with safety checks) ---
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('close-button');
  const mobileWindow = document.getElementById('window');
  
  const openMenu = () => {
    if (mobileWindow) mobileWindow.style.display = 'block';
  };
  
  const closeMenu = () => {
    if (mobileWindow) mobileWindow.style.display = 'none';
  };

  if (menuIcon) menuIcon.addEventListener('click', openMenu);
  if (xIcon) xIcon.addEventListener('click', closeMenu);
  
  // Close menu when links are clicked
  const mobileLinks = document.querySelectorAll('#closer1, #closer2, #closer3');
  if (mobileLinks) {
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // --- Modal & Project Loading Logic ---
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const workCardContainer = document.getElementById('work-card');

  const closeProjectModal = () => {
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const modalCloseBtn = document.getElementById('btn-close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (overlay) overlay.addEventListener('click', closeProjectModal);

  // --- NEW: Creative Modal Population ---
  const populateModal = (data) => {
    if (!modal) return;

    // The modal now has a more creative, two-column layout
    const modalContent = `
      <div class="modal-container-new">
        <button class="btn-close-new" id="btn-close-new">&times;</button>
        <div class="modal-image-column" style="background-image: url('./images/about-image/${data.imag}')"></div>
        <div class="modal-details-column">
          <h2 class="modal-title-new">${data.title}</h2>
          <div class="modal-info-new">
            <span>${data.clientName}</span> &bull; <span>${data.role}</span> &bull; <span>${data.clientYear}</span>
          </div>
          <p class="modal-desc-new">${data.projectDescription}</p>
          <ul class="modal-tags-new">
            ${data.tags.map(tag => `<li>${tag}</li>`).join('')}
          </ul>
          <div class="modal-buttons-new">
            <a href="${data.seeLive}" target="_blank">
              <span>See Live</span>
              <img src="./images/live-icon.svg" alt="Live Icon"/>
            </a>
            <a href="${data.seeSource}" target="_blank">
              <span>See Source</span>
              <img src="./images/git-icon.svg" alt="Source Icon"/>
            </a>
          </div>
        </div>
      </div>
    `;
    
    modal.innerHTML = modalContent;
    
    // Add event listener to the new close button
    const newCloseBtn = document.getElementById('btn-close-new');
    if(newCloseBtn) newCloseBtn.addEventListener('click', closeProjectModal);

    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open
  };
  
  // --- NEW: Elegant Project Card Creation ---
  const createWorkCard = (project, index) => {
    const isReversed = index % 2 !== 0; // Alternate layout
    return `
    <div class="project-card-new ${isReversed ? 'reversed' : ''}" data-id="${index}">
      <div class="project-image-wrapper">
        <img src="./images/about-image/${project.imag}" alt="${project.title}" class="project-image" />
        <div class="project-image-overlay"></div>
      </div>
      <div class="project-content">
        <h3 class="project-title-new">${project.title}</h3>
        <div class="project-info-new">
          <span>${project.clientName}</span> &bull; <span>${project.role}</span> &bull; <span>${project.clientYear}</span>
        </div>
        <p class="project-description-new">${project.projectDescription}</p>
        <ul class="project-tags-new">
          ${project.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <button type="button" class="view-btn-new" data-id="${index}">View Project Details</button>
      </div>
    </div>
    `;
  };

  const loadProjects = async () => {
    if (!workCardContainer) {
      console.error('Work card container not found!');
      return;
    }
    try {
      const response = await fetch('./projects.json');
      if (!response.ok) throw new Error('Failed to fetch projects.json.');
      const projects = await response.json();
      
      workCardContainer.innerHTML = projects.map(createWorkCard).join('');

      // Use event delegation for project clicks
      workCardContainer.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.view-btn-new, .project-image-wrapper');
        if (targetButton) {
          const projectIndex = targetButton.getAttribute('data-id') || targetButton.closest('.project-card-new').getAttribute('data-id');
          if (projects[projectIndex]) {
            populateModal(projects[projectIndex]);
          }
        }
      });

    } catch (error) {
      console.error('Error loading projects:', error);
      workCardContainer.innerHTML = '<p style="color: red; text-align: center;">Failed to load projects.</p>';
    }
  };

  // --- Form Logic ---
  const form = document.getElementById('form');
  const email = document.getElementById('email');
  const errorMsg = document.querySelector('small');
  const userName = document.getElementById('name');
  const userMessage = document.getElementById('comment');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      if (email && email.value !== email.value.toLowerCase()) {
        e.preventDefault();
        if (errorMsg) errorMsg.style.display = 'block';
      } else {
        if (errorMsg) errorMsg.style.display = 'none';
      }
    });
  }

  // --- Local Storage Logic ---
  const populateStorage = () => {
    if (userName && email && userMessage) {
        const userInput = { name: userName.value, email: email.value, message: userMessage.value };
        localStorage.setItem('userInput', JSON.stringify(userInput));
    }
  };
  
  const setFormFromStorage = () => {
    const storedInput = JSON.parse(localStorage.getItem('userInput'));
    if (storedInput && userName && email && userMessage) {
        userName.value = storedInput.name || '';
        email.value = storedInput.email || '';
        userMessage.value = storedInput.message || '';
    }
  };
  
  if(userName && email && userMessage) {
      userName.addEventListener('input', populateStorage);
      email.addEventListener('input', populateStorage);
      userMessage.addEventListener('input', populateStorage);
      setFormFromStorage();
  }

  // --- Initial Script Calls ---
  loadProjects();
});

