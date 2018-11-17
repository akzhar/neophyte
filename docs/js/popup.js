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
