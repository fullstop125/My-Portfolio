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

// --- Mobile Menu ---
const toggleMenu = () => {
  mobileMenu.classList.toggle('active');
};

hamBurger.addEventListener('click', toggleMenu);
cancelBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach((link) => {
  link.addEventListener('click', toggleMenu);
});

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
          <li class="card-info-item">CANOPY</li>
          <li class="card-info-item">&#x2022; Back End Dev</li>
          <li class="card-info-item">&#x2022; 2022</li>
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
      <li class="card-info-item">CANOPY</li>
      <li class="card-info-item">&#x2022; Back End Dev</li>
      <li class="card-info-item">&#x2022; 2022</li>
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
  // DEBUG: Check if the container element exists
  if (!workCardContainer) {
    console.error("Error: The element with id 'work-card' was not found in your HTML.");
    return;
  }

  try {
    const response = await fetch('./projects.json');
    const projects = await response.json();

    // DEBUG: Log the fetched projects to the console to confirm success
    console.log('Projects loaded successfully:', projects);

    // Create a card for each project
    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = createWorkCard(project);
      workCardContainer.appendChild(card);
    });

    // Add event listeners to all "See Project" buttons after they are created
    const seeProjectBtns = document.querySelectorAll('.card-btn[data-id]');
    seeProjectBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectId = e.target.getAttribute('data-id');
        const projectData = projects.find((p) => p.id === projectId);
        if (projectData) {
          createModal(projectData);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching or processing projects:', error);
  }
};

// --- Form Validation ---
const showError = (input, message) => {
  const errorMsg = input.nextElementSibling;
  errorMsg.innerText = message;
  errorMsg.style.display = 'block';
};

const hideError = (input) => {
  const errorMsg = input.nextElementSibling;
  errorMsg.style.display = 'none';
};

form.addEventListener('submit', (e) => {
  // Check if email is lowercase
  if (email.value !== email.value.toLowerCase()) {
    e.preventDefault(); // Stop form submission
    showError(email, 'Email must be in lowercase.');
  } else {
    hideError(email);
  }
});

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
  if (storedInput) {
    username.value = storedInput.name || '';
    email.value = storedInput.email || '';
    comment.value = storedInput.comment || '';
  }
};

// Add event listeners to save form data on input
username.addEventListener('input', populateStorage);
email.addEventListener('input', populateStorage);
comment.addEventListener('input', populateStorage);

// --- Initial Load ---
// Use DOMContentLoaded to run the script as soon as the HTML is ready,
// without waiting for all images to load. This is faster and more reliable.
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadFormData();
});

