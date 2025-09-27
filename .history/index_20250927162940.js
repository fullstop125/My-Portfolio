// --- Wait for the DOM to be fully loaded before running any script ---
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selection ---
  const hamBurger = document.querySelector('.ham-burger');
  const mobileMenu = document.querySelector('.menu-items-mobile');
  const cancelBtn = document.querySelector('.cancel-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const modalContainer = document.getElementById('modal-container');
  const workCardContainer = document.getElementById('work-card');
  const form = document.getElementById('form');
  const email = document.getElementById('email');
  const username = document.getElementById('name');
  const comment = document.getElementById('comment');

  // --- Mobile Menu (with safety checks) ---
  const toggleMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.toggle('active');
    }
  };

  if (hamBurger) hamBurger.addEventListener('click', toggleMenu);
  if (cancelBtn) cancelBtn.addEventListener('click', toggleMenu);
  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // --- Modal Popup ---
  const createModal = (data) => {
    // Correctly uses 'description' and 'technologies' from your projects.json
    modalContainer.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${data.title}</h2>
          <span class="close-btn">&times;</span>
        </div>
        <img src="${data.image}" alt="${data.title} project image" class="modal-image">
        <div class="modal-body">
          <p class="modal-description">${data.description}</p>
          <div class="modal-sidebar">
            <ul class="card-tags">
              ${data.technologies.map((tech) => `<li class="card-tag-item">${tech}</li>`).join('')}
            </ul>
            <hr>
            <div class="modal-buttons">
              <a href="${data.liveLink}" class="card-btn" target="_blank" rel="noopener noreferrer">See Live <i class="fas fa-external-link-alt"></i></a>
              <a href="${data.sourceLink}" class="card-btn" target="_blank" rel="noopener noreferrer">See Source <i class="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalContainer.querySelector('.close-btn').addEventListener('click', () => {
      modalContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  };

  // --- Project Card Creation ---
  const createWorkCard = (data) => `
    <div class="card-img-container">
      <img src="${data.image}" alt="${data.title} project screenshot" class="card-img" />
    </div>
    <div class="card-content">
      <h2 class="card-title">${data.title}</h2>
      <p class="card-description">${data.description}</p>
      <ul class="card-tags">
          ${data.technologies.map((tech) => `<li class="card-tag-item">${tech}</li>`).join('')}
      </ul>
      <div class="btn-container">
        <button class="card-btn" data-id="${data.id}">See Project</button>
      </div>
    </div>
  `;

  // --- Load Projects from JSON ---
  const loadProjects = async () => {
    if (!workCardContainer) return;

    try {
      const response = await fetch('./projects.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const projects = await response.json();

      projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = (index % 2 !== 0) ? 'work-card card-reverse' : 'work-card';
        card.innerHTML = createWorkCard(project);
        workCardContainer.appendChild(card);
      });

      workCardContainer.addEventListener('click', (e) => {
        if (e.target.matches('.card-btn[data-id]')) {
          const projectId = e.target.getAttribute('data-id');
          const projectData = projects.find((p) => p.id.toString() === projectId);
          if (projectData) createModal(projectData);
        }
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      workCardContainer.innerHTML = '<p style="color: red; text-align: center;">Could not load projects.</p>';
    }
  };

  // --- Form Validation & Local Storage ---
  const setupForm = () => {
    if (!form || !email || !username || !comment) return;

    const showError = (message) => {
      const errorMsg = email.nextElementSibling;
      if (errorMsg) {
        errorMsg.innerText = message;
        errorMsg.style.display = 'block';
      }
    };
    const hideError = () => {
      const errorMsg = email.nextElementSibling;
      if (errorMsg) errorMsg.style.display = 'none';
    };

    form.addEventListener('submit', (e) => {
      if (email.value !== email.value.toLowerCase()) {
        e.preventDefault();
        showError('Email must be in lowercase.');
      } else {
        hideError();
      }
    });

    const populateStorage = () => {
      const userInput = { name: username.value, email: email.value, comment: comment.value };
      localStorage.setItem('userInput', JSON.stringify(userInput));
    };

    const loadFormData = () => {
      const storedInput = JSON.parse(localStorage.getItem('userInput'));
      if (storedInput) {
        username.value = storedInput.name || '';
        email.value = storedInput.email || '';
        comment.value = storedInput.comment || '';
      }
    };

    [username, email, comment].forEach(input => input.addEventListener('input', populateStorage));
    loadFormData();
  };

  // --- Initial Calls ---
  loadProjects();
  setupForm();
});

