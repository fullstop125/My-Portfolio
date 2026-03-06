// --- Wait for the DOM to be fully loaded ---
document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Logic ---
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMenu = () => mobileMenu && mobileMenu.classList.remove('hidden');
  const closeMenu = () => mobileMenu && mobileMenu.classList.add('hidden');

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileLinks) mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // --- Modal & Project Loading Logic ---
  const modalContainer = document.getElementById('modal-container');
  const workCardContainer = document.getElementById('work-card-container'); // Corrected ID

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
          <img src="./images/${project.imag}" alt="${project.title}" class="w-full h-auto md:h-80 object-cover rounded-lg mb-6">
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

  const closeProjectModal = () => {
    if (modalContainer) modalContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  if (modalContainer) modalContainer.addEventListener('click', closeProjectModal);
  
  const createWorkCard = (project, index) => {
    // This structure now matches your original CSS styling but uses a combination of inline styles and a single class for the gradient background.
    const isReversed = index % 2 !== 0;
    
    return `
    <div class="project-container md:flex ${isReversed ? 'flex-row-reverse' : ''} items-center gap-8 border border-[#dfe1e6] rounded-2xl p-6 md:p-8" style="background: linear-gradient(to right, rgb(201, 230, 209), rgb(217, 209, 230));">
        <div class="md:w-1/2 mb-6 md:mb-0">
            <img src="./images/${project.imag}" alt="${project.title}" class="w-full h-auto object-cover rounded-lg shadow-lg">
        </div>
        <div class="md:w-1/2">
            <h3 class="text-3xl font-bold text-[#172b4d]">${project.title}</h3>
            <div class="flex items-center space-x-3 text-xs my-3">
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
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const projects = await response.json();

      // Add a unique ID to each project for easier selection
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
      console.error("Failed to load projects:", error);
      workCardContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">Could not load projects. Please check the console.</p>`;
    }
  };

  // --- Form Logic ---
  const form = document.getElementById('form');
  const emailInput = document.getElementById('email');

  if(form && emailInput) {
      const errorMsg = emailInput.nextElementSibling;
      form.addEventListener('submit', (e) => {
          if (emailInput.value !== emailInput.value.toLowerCase()) {
              e.preventDefault();
              if (errorMsg) errorMsg.classList.remove('hidden');
          } else {
              if (errorMsg) errorMsg.classList.add('hidden');
          }
      });

      const nameInput = document.getElementById('name');
      const commentInput = document.getElementById('comment');
      const populateStorage = () => localStorage.setItem('formData', JSON.stringify({ name: nameInput.value, email: emailInput.value, comment: commentInput.value }));
      
      if(nameInput && commentInput) {
          [nameInput, emailInput, commentInput].forEach(input => input.addEventListener('input', populateStorage));
          const savedData = JSON.parse(localStorage.getItem('formData'));
          if (savedData) {
              nameInput.value = savedData.name || '';
              emailInput.value = savedData.email || '';
              commentInput.value = savedData.comment || '';
          }
      }
  }

  // --- Initial Script Calls ---
  loadProjects();
});

