var menubutton = document.querySelector(".header__menu-button");
var menu = document.querySelector(".menu");

menu.classList.remove("menu--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("menu--open");
  menubutton.classList.toggle("header__menu-button--open");
});
