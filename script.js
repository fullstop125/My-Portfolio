const menuIcon = document.getElementById('menu-icon');
const xIcon = document.getElementById('close-button');
const listItems1 = document.getElementById('list-items-1');
const listItems2 = document.getElementById('list-items-2');
const listItems3 = document.getElementById('list-items-3');

function myFunction(x) {
  if (x.matches) {
    // menuIcon.style.display = 'none';
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