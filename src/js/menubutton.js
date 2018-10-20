var menubutton = document.querySelector(".menu-btn");
var menu = document.querySelector(".navigation-list");

menu.classList.remove("navigation-list--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("navigation-list--open");
  menubutton.classList.toggle("menu-btn--open");
});
