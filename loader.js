let loaderTimeout;

const loaderFunc = () => {
  loaderTimeout = setTimeout(showPage, 1500);
};

const showPage = () => {
  document.getElementById('loader').style.display = 'none';
  document.getElementsByTagName('header')[0].style.display = 'block';
  document.getElementsByTagName('main')[0].style.display = 'block';
};
