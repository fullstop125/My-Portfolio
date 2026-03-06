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
  };

  const modalCloseBtn = document.getElementById('btn-close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (overlay) overlay.addEventListener('click', closeProjectModal);

  const populateModal = (data) => {
    if (!modal) return;
    
    // Select elements inside the modal
    const modalTitle = modal.querySelector('#modal-title');
    const role = modal.querySelector('#role');
    const clientName = modal.querySelector('#client-name');
    const clientYear = modal.querySelector('#client-year');
    const modalImage = modal.querySelector('#modal-image');
    const modalDesc = modal.querySelector('#modal-desc');
    const techList = modal.querySelector('#ul');
    const seeLiveLink = modal.querySelector('#see-live');
    const seeSourceLink = modal.querySelector('#see-source');

    if (modalTitle) modalTitle.innerText = data.title;
    if (role) role.innerText = data.role;
    if (clientName) clientName.innerText = data.clientName;
    if (clientYear) clientYear.innerText = data.clientYear;
    if (modalImage) modalImage.src = `./images/about-image/${data.imag}`;
    if (modalDesc) modalDesc.innerText = data.projectDescription;
    if (seeLiveLink) seeLiveLink.href = data.seeLive;
    if (seeSourceLink) seeSourceLink.href = data.seeSource;

    // Populate technologies
    if (techList) {
      techList.innerHTML = ''; // Clear previous tags
      data.tags.forEach(tag => {
        techList.innerHTML += `<li>${tag}</li>`;
      });
    }

    modal.classList.add('active');
    overlay.classList.add('active');
  };

  const createWorkCard = (project, index) => {
    // This HTML structure is taken directly from your original JS file
    // to ensure it matches your style.css perfectly.
    return `
    <div class="project-container">
      <div style="background-image:url(./images/about-image/${project.imag});" class="project-img img"></div>
      <div class="about-project">
        <div class="project-title">
          <h4>${project.title}</h4>
        </div>
        <div class="project-info">
          <ul>
            <li class="role">${project.role}</li>
            <li><img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" /></li>
            <li class="client-name">${project.clientName}</li>
            <li><img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" /></li>
            <li class="client-year">${project.clientYear}</li>
          </ul>
        </div>
        <div class="project-description">
          <p>${project.projectDescription}</p>
        </div>
        <div class="tags">
          <ul>
            ${project.tags.map(tag => `<li>${tag}</li>`).join('')}
          </ul>
        </div>
        <div class="btn-container">
          <button type="button" class="view-btn" data-id="${index}">See Project</button>
        </div>
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
      if (!response.ok) throw new Error('Failed to fetch projects.');
      const projects = await response.json();
      
      workCardContainer.innerHTML = projects.map(createWorkCard).join('');

      // Add event listeners after cards are created
      workCardContainer.addEventListener('click', (e) => {
        if (e.target.matches('.view-btn')) {
          const projectIndex = e.target.getAttribute('data-id');
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
      setFormFromStorage(); // Load saved data on page load
  }

  // --- Initial Script Calls ---
  loadProjects();
});

