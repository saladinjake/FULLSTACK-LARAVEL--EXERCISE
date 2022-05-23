import Config from "./config/Config"
import MenuToggler from "./modules/MenuToggler"
import ModalAction from "./modules/ModalAction"
import HttpRequest from "./modules/HttpRequest"

document.onreadystatechange = function() {
  /*Let the world know you were here*/ 
 
  let Menu =  new MenuToggler();
  Menu.attachEvents();
   
}



