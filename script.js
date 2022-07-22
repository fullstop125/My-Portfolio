const menuIcon = document.getElementById('menu-icon');
const xIcon = document.getElementById('close-button');
const listItems1 = document.getElementById('list-items-1');
const listItems2 = document.getElementById('list-items-2');
const listItems3 = document.getElementById('list-items-3');
const form = document.getElementById('form');
const errorMsg = document.querySelector('small');
const email = document.getElementById('email');

function myFunction(x) {
  if (x.matches) { // If media query matches
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
    title: 'Tonic1',
    imag: 'tonic-project-2.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
  },
  {
    title: 'Tonic2',
    imag: 'Snapshoot_Portfolio.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
  },
  {
    title: 'Tonic3',
    imag: 'tonic-project-2.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
  },
  {
    title: 'Tonic4',
    imag: 'Snapshoot_Portfolio.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
  },
  {
    title: 'Tonic5',
    imag: 'tonic-project-2.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
  },
  {
    title: 'Tonic6',
    imag: 'Snapshoot_Portfolio.svg',
    role: 'Canopy',
    clientName: 'Back End Dev',
    clientYear: '2015',
    projectDescription: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'css', 'javascript'],
    seeLive: 'https://fullstop125.github.io/My-Portfolio/',
    seeSource: 'https://github.com/fullstop125/My-Portfolio/blob/master/README.md',
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
  content += '<img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
  content += '</li>';
  content += `<li class="client-name">${dataItems.clientName}</li>`;
  content += '<li>';
  content += '<img src="./images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
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
  document.getElementById('modal-image').setAttribute('src', './images/about-image/'.concat(data.imag));
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
  document.getElementById('see-project-'.concat(i)).addEventListener('click', () => {
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

// form localStorage Setting

document.getElementById('submit').addEventListener('click', () => {
  const formDataObj = {
    name: document.getElementById('formName').value,
    email: document.getElementById('email').value,
    message: document.getElementById('comment').value,
  };
  const formObj = JSON.stringify(formDataObj);
  localStorage.setItem('formData', formObj);
});
document.getElementById('reset').addEventListener('click', () => {
  localStorage.removeItem('formData');
});

const formObject = localStorage.getItem('formData');
const objectData = JSON.parse(formObject);
document.getElementById('formName').value = objectData.name;
document.getElementById('email').value = objectData.email;
document.getElementById('comment').value = objectData.message;