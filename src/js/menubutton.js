var menubutton = document.querySelector(".header-logo__menu-button");
var menu = document.querySelector(".navigation-list");

menu.classList.remove("navigation-list--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("navigation-list--open");
  menubutton.classList.toggle("header-logo__menu-button--open");
});
