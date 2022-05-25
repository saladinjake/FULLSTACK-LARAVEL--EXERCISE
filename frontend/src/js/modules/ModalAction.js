/*
*company: Binghr.io 
*@author : saladin jake
*@class:
*@description add user modal
*@method: toggleModal
*@method: 

*/

var modal = document.querySelector(".modal-cs");
var triggers = document.querySelectorAll(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

for (var i = 0, len = triggers.length; i < len; i++) {
  triggers[i].addEventListener("click", toggleModal);
}
closeButton.addEventListener("click", toggleModal);
