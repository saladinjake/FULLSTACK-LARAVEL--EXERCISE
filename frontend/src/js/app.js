import MenuToggler from "./modules/MenuToggler"
import HttpRequest from "./modules/HttpRequest"
document.onreadystatechange = function() {
  /*Let the world know you were here*/ 
  MenuToggler.attachEvents();
  HttpRequest.attachEvents();   
}