try{

  var popup = document.querySelector(".popup");
  var logo = document.querySelector(".main-logo");
  var close = popup.querySelector(".popup__btn");

  logo.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("popup--hide");
    popup.classList.add("popup--show");
  });

  close.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("popup--show");
    popup.classList.add("popup--hide");
  });

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("popup--show")) {
        evt.preventDefault();
        popup.classList.remove("popup--show");
        popup.classList.add("popup--hide");
      }
    }
  });

}catch(e){
}

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