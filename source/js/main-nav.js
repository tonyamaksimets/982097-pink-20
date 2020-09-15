var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var navToggleText = navToggle.querySelector('span');

navMain.classList.remove('main-nav--nojs');
navMain.classList.remove('main-nav--opened');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--opened')) {
    navMain.classList.remove('main-nav--opened');
    navToggleText.textContent = 'Открыть меню';
  } else {
    navMain.classList.add('main-nav--opened');
    navToggleText.textContent = 'Закрыть меню';
  }
});
