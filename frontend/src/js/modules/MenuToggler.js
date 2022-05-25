const getDom = (expr) =>{
	return document.querySelector(expr);
}

class MenuToggler{
	constructor(){
	   this.$body = getDom('body');
      this.$openLeftBtn = getDom('.open-left');
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
  }
}

export default MenuToggler;