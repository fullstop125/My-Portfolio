const menuIcon = document.getElementById('menu-icon');
const xIcon = document.getElementById('close-button');
const listItems1 = document.getElementById('list-items-1');
const listItems2 = document.getElementById('list-items-2');
const listItems3 = document.getElementById('list-items-3');
const form = document.getElementById('form');
const errorMsg = document.querySelector('small');
const email = document.getElementById('email');

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    xIcon.style.display = 'block';
    document.getElementById('window').style.display = 'block';
    xIcon.style.color = '#fff';

    xIcon.addEventListener('click', () => {
      document.getElementById('window').style.display = 'none';
    });

    document.getElementById('closer1').addEventListener('click', () => {
      document.getElementById('window').style.display = 'none';
    });
    document.getElementById('closer2').addEventListener('click', () => {
      document.getElementById('window').style.display = 'none';
    });
    document.getElementById('closer3').addEventListener('click', () => {
      document.getElementById('window').style.display = 'none';
    });
  } else {
    listItems1.addEventListener('click', () => {
      listItems1.style.textDecoration = 'underline';
      listItems2.style.textDecoration = 'none';
      listItems3.style.textDecoration = 'none';
    });
    listItems2.addEventListener('click', () => {
      listItems1.style.textDecoration = 'none';
      listItems2.style.textDecoration = 'underline';
      listItems3.style.textDecoration = 'none';
    });
    listItems3.addEventListener('click', () => {
      listItems1.style.textDecoration = 'none';
      listItems2.style.textDecoration = 'none';
      listItems3.style.textDecoration = 'underline';
    });
  }
}
menuIcon.addEventListener('click', () => {
  const x = window.matchMedia('(max-width: 768px)');
  myFunction(x);
});

const cardData = [
  {
    title: 'Space Travelers Hub',
    imag: 'spacehub.png',
    role: 'Space',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website for a company that provides commercial and scientific space travel services. The application allows users to book rockets and join selected space missions.',
    tags: ['html', 'css', 'javascript', 'react', 'redux', 'jest'],
    seeLive: 'https://spacehubrocket.netlify.app/',
    seeSource: 'https://github.com/fullstop125/space-hub',
  },
  {
    title: 'Bookstore CMS',
    imag: 'bookstore.png',
    role: 'Bookstore',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website that allows you to add and remove books from a list. All data is preserved thanks to the external Bookstore API service.',
    tags: ['javascript', 'API', 'react', 'redux', 'jest', 'bootstrap'],
    seeLive: 'https://bookstorecmsreact.netlify.app/',
    seeSource: 'https://github.com/fullstop125/bookstore/',
  },
  {
    title: 'Dynasty Entertainment',
    imag: 'anime.png',
    role: 'Entertainment',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website that renders a collecion of animes. It also allows you to like and comment on the animes. Data is preserved thanks to the external Involvement API. Anime data is provided by Animedb API.',
    tags: ['html', 'css', 'javascript', 'API', 'webpack', 'jest'],
    seeLive: 'https://fullstop125.github.io/capstone-project-anime-db/',
    seeSource: 'https://github.com/fullstop125/capstone-project-anime-db',
  },
  {
    title: 'MATH MAGICIANS',
    imag: 'react-app.png',
    role: 'Mathematics',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website for all fans of mathematics. It is a Single Page App (SPA) that allows users to make simple calculations and read a random math-related quote.',
    tags: ['JavaScript', 'react', 'redux', 'jest'],
    seeLive: 'https://calculatorappjs.netlify.app/',
    seeSource: 'https://github.com/fullstop125/math-magicians',
  },
  {
    title: 'Leaderboard',
    imag: 'leaderboard.png',
    role: 'performance',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website that displays scores submitted by different players. It also allows you to submit your score. All data is preserved thanks to the external Leaderboard API service.',
    tags: ['JavaScript', 'webpack', 'jest', 'API', 'bootstrap '],
    seeLive: 'https://fullstop125.github.io/Leader-Board/',
    seeSource: 'https://github.com/fullstop125/Leader-Board',
  },
  {
    title: 'To-Do-List App',
    imag: 'todo.png',
    role: 'Management',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A simple To Do list to track all activities that are completed and those that are yet to be completed.',
    tags: ['html', 'css', 'JavaScript'],
    seeLive: 'https://fullstop125.github.io/To-Do-List/',
    seeSource: 'https://github.com/fullstop125/To-Do-List',
  },

  {
    title: 'Metrics Web App',
    imag: 'metrics.png',
    role: 'Metrics',
    clientName: 'Back End Dev',
    clientYear: '2022',
    projectDescription:
      'A website that displays a list of metrics (numeric values) that are submitted by different users. It also allows you to submit your data. All data is preserved thanks to the external Leaderboard API service.',
    tags: ['html', 'css', 'React', 'API'],
    seeLive: 'https://metrics-app.netlify.app/',
    seeSource: 'https://github.com/fullstop125/metrics-webapp',
  },
];

const setCardData = document.getElementById('work-card');

cardData.forEach((dataItems, pos) => {
  let content = '<div class="project-container">';
  content += `<div style="background-image:url(./images/about-image/${dataItems.imag});" class="project-img img"></div>`;
  content += '<div class="about-project">';
  content += '<div class="project-title">';
  content += `<h4>${dataItems.title}</h4>`;
  content += '</div>';
  content += '<div class="project-info">';
  content += '<ul>';
  content += `<li class="role">${dataItems.role}</li>`;
  content += '<li>';
  content +=
    '<img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
  content += '</li>';
  content += `<li class="client-name">${dataItems.clientName}</li>`;
  content += '<li>';
  content +=
    '<img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
  content += '</li>';
  content += `<li class="client-year">${dataItems.clientYear}</li>`;
  content += '</ul>';
  content += '</div>';
  content += '<div class="project-description">';
  content += '<p>';
  content += `${dataItems.projectDescription}`;
  content += '</p>';
  content += '</div>';
  content += '<div class="tags">';
  content += '<ul>';
  dataItems.tags.forEach((tagData) => {
    content += `<li>${tagData}</li>`;
  });
  content += '</ul>';
  content += '</div>';
  content += '<div class="btn-container">';
  content += `<button type="submit" id="see-project-${pos}" class="view-btn">See Project</button>`;
  content += '</div>';
  content += '</div>';
  content += '</div>';
  setCardData.innerHTML += content;
});

document.getElementById('btn-close').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
});

function setData(data) {
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('role').innerText = data.role;
  document.getElementById('client-name').innerText = data.clientName;
  document.getElementById('client-year').innerText = data.clientYear;
  document
    .getElementById('modal-image')
    .setAttribute('src', './images/about-image/'.concat(data.imag));
  document.getElementById('modal-desc').innerText = data.projectDescription;
  document.getElementById('ul').innerHTML = '';
  data.tags.forEach((tagItems) => {
    const ul = document.getElementById('ul');
    ul.innerHTML += `<li>${tagItems}</li>`;
  });
  document.getElementById('see-live').setAttribute('href', data.seeLive);
  document.getElementById('see-source').setAttribute('href', data.seeSource);
}

cardData.forEach((items, i) => {
  document
    .getElementById('see-project-'.concat(i))
    .addEventListener('click', () => {
      document.getElementById('modal').classList.add('active');
      document.getElementById('overlay').classList.add('active');
      setData(items);
    });
});

// form validation code
form.addEventListener('submit', (e) => {
  const emailValue = email.value;
  if (emailValue !== emailValue.toLowerCase()) {
    e.preventDefault();
    errorMsg.classList.add('display-content');
  }
});

const userName = form.elements.name;
const userEmail = form.elements.email;
const userMessage = form.elements.comment;
function populateStorage() {
  const userInput = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    message: form.elements.comment.value,
  };
  localStorage.setItem('userInput', JSON.stringify(userInput));
}
function setForm() {
  const storedInput = JSON.parse(localStorage.getItem('userInput'));
  const currentUserName = storedInput.name;
  const currentUserEmail = storedInput.email;
  const currentMessage = storedInput.comment;
  form.elements.name.value = currentUserName;
  form.elements.email.value = currentUserEmail;
  form.elements.comment.value = currentMessage;
}
if (!localStorage.getItem('userInput')) {
  populateStorage();
} else {
  setForm();
}
userName.onchange = populateStorage;
userEmail.onchange = populateStorage;
userMessage.onchange = populateStorage;
