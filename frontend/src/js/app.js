import Config from "./config/Config"
import MenuToggler from "./modules/MenuToggler"
import ModalAction from "./modules/ModalAction"
import HttpRequest from "./modules/HttpRequest"
import TableSearch from "./modules/TableSearch"
window.addEventListener('DOMContentLoaded',  function() {
  /*Let the world know you were here*/ 
  const Menu =  new MenuToggler();
  const HttpEvents = new HttpRequest();
  const TableSort =  new TableSearch()
  Menu.attachEvents();
  HttpEvents.attachEvents();
  TableSort.attachEvents()
})



