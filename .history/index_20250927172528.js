// --- Wait for the DOM to be fully loaded before running any script ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Animate on Scroll
  AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
  });

  // --- DOM Element Selection ---
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const modalContainer = document.getElementById('modal-container');
  const workCardContainer = document.getElementById('work-card-container');
  const form = document.getElementById('form');
  const email = document.getElementById('email');
  const username = document.getElementById('name');
  const comment = document.getElementById('comment');

  // --- Mobile Menu (with safety checks) ---
  const openMenu = () => mobileMenu && mobileMenu.classList.remove('hidden');
  const closeMenu = () => mobileMenu && mobileMenu.classList.add('hidden');

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileLinks) mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // --- Modal & Project Loading Logic ---
  const closeProjectModal = () => {
    if (modalContainer) modalContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  
  const createModal = (project) => {
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col p-4 md:p-6 mx-4" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-4 border-b pb-4">
          <h2 class="text-2xl md:text-3xl font-bold text-[#172b4d]">${project.title}</h2>
          <button class="modal-close-btn text-4xl text-[#67798e]">&times;</button>
        </div>
        <div class="flex items-center space-x-4 text-sm mb-4">
          <span class="font-semibold text-[#344563] uppercase">${project.clientName || 'Personal'}</span>
          <span class="text-gray-400">•</span>
          <span class="text-gray-500">${project.role || 'Full Stack Dev'}</span>
          <span class="text-gray-400">•</span>
          <span class="text-gray-500">${project.clientYear || '2023'}</span>
        </div>
        <div class="overflow-y-auto">
          <img src="./images/about-image/${project.imag}" alt="${project.title}" class="w-full h-auto md:h-80 object-cover rounded-lg mb-6">
          <div class="grid md:grid-cols-3 gap-6">
            <p class="md:col-span-2 text-[#344563] leading-relaxed">${project.projectDescription}</p>
            <div class="md:col-span-1">
              <ul class="flex flex-wrap gap-2 mb-6">
                ${project.tags.map(tag => `<li class="bg-[#ebebff] text-[#6070ff] text-xs font-medium px-3 py-1 rounded-full">${tag}</li>`).join('')}
              </ul>
              <hr class="mb-4">
              <div class="flex items-center space-x-4">
                <a href="${project.seeLive}" target="_blank" class="flex items-center justify-center w-full bg-white text-[#396df2] border border-[#6070ff] rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#6070ff] hover:text-white transition-all">
                  See Live <img src="./images/live-icon.svg" class="ml-2 w-4 h-4">
                </a>
                <a href="${project.seeSource}" target="_blank" class="flex items-center justify-center w-full bg-white text-[#396df2] border border-[#6070ff] rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#6070ff] hover:text-white transition-all">
                  See Source <img src="./images/git-icon.svg" class="ml-2 w-4 h-4">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const closeModalBtn = modalContainer.querySelector('.modal-close-btn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  };
  
  if (modalContainer) modalContainer.addEventListener('click', closeProjectModal);

  const createWorkCard = (project, index) => {
    const isReversed = index % 2 !== 0;
    return `
    <div class="grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
        <div class="project-image-wrapper rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 ${isReversed ? 'md:order-2' : ''}">
            <img src="./images/about-image/${project.imag}" alt="${project.title}" class="w-full h-full object-cover">
        </div>
        <div class="${isReversed ? 'md:order-1' : ''}">
            <h3 class="text-3xl font-bold text-[#172b4d]">${project.title}</h3>
            <div class="flex items-center space-x-3 text-xs my-4">
                <span class="font-semibold text-[#344563] uppercase">${project.clientName || 'Personal'}</span>
                <span class="text-gray-400">•</span>
                <span class="text-gray-500">${project.role || 'Full Stack Dev'}</span>
                <span class="text-gray-400">•</span>
                <span class="text-gray-500">${project.clientYear || '2023'}</span>
            </div>
            <p class="text-[#344563] text-sm leading-relaxed mb-4">${project.projectDescription}</p>
            <ul class="flex flex-wrap gap-2 mb-6">
                ${project.tags.map(tag => `<li class="bg-[#ebebff] text-[#6070ff] text-xs font-medium px-2 py-1 rounded-full">${tag}</li>`).join('')}
            </ul>
            <button class="view-project-btn text-[#396df2] border border-[#6070ff] rounded-lg px-4 py-3 font-medium hover:bg-[#6070ff] hover:text-white transition-all duration-300" data-id="${project.id}">
                See Project
            </button>
        </div>
    </div>
    `;
  }

  const loadProjects = async () => {
    if (!workCardContainer) {
      console.error('Project container not found!');
      return;
    }
    try {
      const response = await fetch('./projects.json');
      if (!response.ok) throw new Error('Failed to fetch projects.json');
      const projects = await response.json();
      
      const projectsWithIds = projects.map((p, i) => ({ ...p, id: i }));

      workCardContainer.innerHTML = projectsWithIds.map(createWorkCard).join('');
      
      workCardContainer.addEventListener('click', (e) => {
        if (e.target.matches('.view-project-btn')) {
          const projectId = e.target.getAttribute('data-id');
          const projectData = projectsWithIds.find(p => p.id.toString() === projectId);
          if (projectData) createModal(projectData);
        }
      });

    } catch (error) {
      console.error('Error loading projects:', error);
      workCardContainer.innerHTML = `<p class="text-red-500 text-center">Failed to load projects.</p>`;
    }
  };

  // --- Form Logic ---
  const setupForm = () => {
    if (!form || !email || !username || !comment) return;

    const showError = (message) => {
      const errorMsg = email.nextElementSibling;
      if (errorMsg) {
        errorMsg.innerText = message;
        errorMsg.classList.remove('hidden');
      }
    };
    const hideError = () => {
      const errorMsg = email.nextElementSibling;
      if (errorMsg) errorMsg.classList.add('hidden');
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

  // --- Initial Script Calls ---
  loadProjects();
  setupForm();
});

