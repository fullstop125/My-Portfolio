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

  // Only add event listeners if the elements actually exist
  if (hamBurger) {
    hamBurger.addEventListener('click', toggleMenu);
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', toggleMenu);
  }
  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // --- Modal Popup ---
  const createModal = (data) => {
    // Dynamically create the HTML for the modal
    modalContainer.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${data.title}</h2>
          <span class="close-btn">&times;</span>
        </div>
        <ul class="card-info">
            <li class="card-info-item">${data.role}</li>
            <li class="card-info-item">&#x2022; ${data.clientName}</li>
            <li class="card-info-item">&#x2022; ${data.clientYear}</li>
          </ul>
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

    // Display the modal and handle closing it
    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    const closeBtn = modalContainer.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modalContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  };

  // --- Project Card Creation ---
  const createWorkCard = (data) => `
    <div class="card-img-container">
      <img
        src="${data.image}"
        alt="${data.title} project screenshot"
        class="card-img"
      />
    </div>
    <div class="card-content">
      <h2 class="card-title">${data.title}</h2>
      <ul class="card-info">
        <li class="card-info-item">${data.role}</li>
        <li class="card-info-item">&#x2022; ${data.clientName}</li>
        <li class="card-info-item">&#x2022; ${data.clientYear}</li>
      </ul>
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
    if (!workCardContainer) {
      console.error("Error: The element with id 'work-card' was not found in your HTML.");
      return;
    }

    try {
      const response = await fetch('./projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const projects = await response.json();

      console.log('Projects loaded successfully:', projects);

      projects.forEach((project) => {
        const card = document.createElement('div');
        // Add classes for styling and layout
        if (projects.indexOf(project) > 0) {
            card.className = 'work-card card-reverse';
        }else{
            card.className = 'work-card';
        }
        card.innerHTML = createWorkCard(project);
        workCardContainer.appendChild(card);
      });

      const seeProjectBtns = document.querySelectorAll('.card-btn[data-id]');
      seeProjectBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const projectId = e.target.getAttribute('data-id');
          const projectData = projects.find((p) => p.id.toString() === projectId);
          if (projectData) {
            createModal(projectData);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching or processing projects.json:', error);
      workCardContainer.innerHTML = '<p style="color: red; text-align: center;">Could not load projects. Please check the console for errors.</p>';
    }
  };

  // --- Form Validation ---
  const showError = (input, message) => {
    const errorMsg = input.nextElementSibling;
    if (errorMsg) {
      errorMsg.innerText = message;
      errorMsg.style.display = 'block';
    }
  };

  const hideError = (input) => {
    const errorMsg = input.nextElementSibling;
    if (errorMsg) {
      errorMsg.style.display = 'none';
    }
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      if (email.value !== email.value.toLowerCase()) {
        e.preventDefault();
        showError(email, 'Email must be in lowercase.');
      } else {
        hideError(email);
      }
    });
  }

  // --- Local Storage for Form ---
  const populateStorage = () => {
    const userInput = {
      name: username.value,
      email: email.value,
      comment: comment.value,
    };
    localStorage.setItem('userInput', JSON.stringify(userInput));
  };

  const loadFormData = () => {
    const storedInput = JSON.parse(localStorage.getItem('userInput'));
    if (storedInput && username && email && comment) {
      username.value = storedInput.name || '';
      email.value = storedInput.email || '';
      comment.value = storedInput.comment || '';
    }
  };

  if (username && email && comment) {
    username.addEventListener('input', populateStorage);
    email.addEventListener('input', populateStorage);
    comment.addEventListener('input', populateStorage);
  }

  // --- Initial Calls ---
  loadProjects();
  loadFormData();
});

