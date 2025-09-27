const menuIcon = document.getElementById('menu-icon');
const xIcon = document.getElementById('close-button');
const listItems1 = document.getElementById('list-items-1');
const listItems2 = document.getElementById('list-items-2');
const listItems3 = document.getElementById('list-items-3');
const form = document.querySelector('form');
const errorMsg = document.querySelector('small');
const email = document.getElementById('email');

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    xIcon.style.display = 'block';
    document.getElementById('window').style.display = 'block';
    xIcon.style.color = '#fff';
    const closeWindow = () => { document.getElementById('window').style.display = 'none'; };

    xIcon.addEventListener('click', closeWindow);
    document.getElementById('closer1').addEventListener('click', closeWindow);
    document.getElementById('closer2').addEventListener('click', closeWindow);
    document.getElementById('closer3').addEventListener('click', closeWindow);
  } else {
    const listItems = [listItems1, listItems2, listItems3];
    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        listItems.forEach((listItem) => {
          listItem.style.textDecoration = 'none';
        });
        item.style.textDecoration = 'underline';
      });
    });
  }
}
menuIcon.addEventListener('click', () => {
  const x = window.matchMedia('(max-width: 768px)');
  myFunction(x);
});


const setCardData = document.getElementById('work-card');

cardData.forEach((dataItems, pos) => {
  let content = '<div class="project-container">';
  content += `<div style="background-image:url(../images/about-image/${dataItems.imag});" class="project-img img"></div>`;
  content += '<div class="about-project">';
  content += '<div class="project-title">';
  content += `<h4>${dataItems.title}</h4>`;
  content += '</div>';
  content += '<div class="project-info">';
  content += '<ul>';
  content += `<li class="role">${dataItems.role}</li>`;
  content += '<li>';
  content
    += '<img src="../images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
  content += '</li>';
  content += `<li class="client-name">${dataItems.clientName}</li>`;
  content += '<li>';
  content
    += '<img src="../images/about-image/Counter.png" class="small-dot" alt="counter.png" />';
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
    .setAttribute('src', '../images/about-image/'.concat(data.imag));
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

// form validation start

form.addEventListener('submit', (e) => {
  const emailValue = email.value;
  if (emailValue !== emailValue.toLowerCase()) {
    e.preventDefault();
    errorMsg.classList.add('display-content');
  }
});

// form localStorage Setting
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
  const currentMessage = storedInput.message;
  form.elements.name.value = currentUserName;
  form.elements.email.value = currentUserEmail;
  form.elements.comment.value = currentMessage;
}
if (!localStorage.getItem('userInput')) {
  populateStorage();
} else {
  setForm();
}
userName.onkeypress = populateStorage;
userEmail.onkeypress = populateStorage;
userMessage.onkeypress = populateStorage;

