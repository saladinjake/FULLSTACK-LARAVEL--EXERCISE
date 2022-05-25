
/*
*company: Binghr.io 
*@author : saladin jake
*@description get element by selector
*@params: string selector
*@returns HTMLELEMENT
*/
const getDom = (expr) =>{
	return document.querySelector(expr);
}



/*
*company: Binghr.io 
*@author : saladin jake
*@class: MenuToggler
*@description slide and push menu
*@method: openLeftBar
*@method: attachEvents

*/
class MenuToggler{
	constructor(){
	   this.$body = getDom('body');
      this.$openLeftBtn = getDom('.open-left');
      this.$openLeftBtn2 = getDom('.open-left2');
      this.$menuItem = getDom('.entity2');
	}

   openLeftBar = () =>{
    
    getDom('#wrapper').classList.toggle('enlarged');
    getDom('#wrapper').classList.add('forced');

    if (getDom('#wrapper').classList.contains('enlarged') && getDom('body').classList.contains('fixed-left')) {
      getDom('body')
        .classList.remove('fixed-left')
        getDom('body')
        .classList.add('fixed-left-void');
    } else if (!getDom('#wrapper').classList.contains('enlarged') && getDom('body').classList.contains('fixed-left-void')) {
      getDom('body')
        .classList.remove('fixed-left-void')
      getDom('body')
        .classList.add('fixed-left');
    }

    
  
    
    // getDom('body').classList.add('enlarged');
  }

  attachEvents(){
  	var ua = navigator.userAgent,
    event = ua.match(/iP/i) ? 'touchstart' : 'click';
    let $this = this;
      //bind on click
    this.$openLeftBtn.addEventListener(event, function(e) {
      e.stopPropagation();
      $this.openLeftBar();
    });

    this.$openLeftBtn2.addEventListener(event, function(e) {
      e.stopPropagation();
      $this.openLeftBar();
    });
  }
}

export default MenuToggler;