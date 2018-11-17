try {

  var menubutton = document.querySelector(".menu-btn");
  var menu = document.querySelector(".navigation-list");

  menu.classList.remove("navigation-list--nojs");

  menubutton.addEventListener("click", function(evt) {
    evt.preventDefault();
    menu.classList.toggle("navigation-list--open");
    menubutton.classList.toggle("menu-btn--open");
  });

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (menu.classList.contains("navigation-list--open")) {
        evt.preventDefault();
        menu.classList.remove("navigation-list--open");
      }
    }
  });

}catch(e){
}

