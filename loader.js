let loaderTimeout;

const loaderFunc = () => {
  loaderTimeout = setTimeout(showPage, 1500);
};

const showPage = () => {
  document.getElementById('loader').style.display = 'none';
  document.getElementsByTagName('header')[0].style.display = 'block';
  document.getElementsByTagName('main')[0].style.display = 'block';
};

const toggleMenu = () => {
  var menuIcon = document.querySelector('.header-toggle-icon');
  var menuItems = document.querySelector('.header-mobile');

  if (menuItems.style.display === 'block') {
    menuItems.style.display = 'none';
  } else {
    menuIcon.style.display = 'none';
    menuItems.style.display = 'block';
  }
};
