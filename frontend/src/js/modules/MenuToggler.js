const getDom = (expr) =>{
	return document.querySelector(expr);
}

var open = true;

getDom('.open-left').addEventListener('click',function() {
  if(!open) {
    showMenu();
  }
  else {
    hideMenu();
  }
});

// getDom('nav a').click(function() {
//   hideMenu();
// });

function hideMenu() {
  getDom('.entity2').style.width=0;
  getDom('.content-page').style.width =getDom('.content-page').style.width+ 250;
  open = false;
};

function showMenu() {
  getDom('.entity2').style.width="240px";
  getDom('.content-page').classList.add('menu-push-right');
  open = true;
};
class MenuToggler{
	constructor(){
	 
	}

   openLeftBar = () =>{
    //this.$menuItem..display=""
    // getDom('#wrapper').classList.toggle('enlarged');
    // getDom('#wrapper').classList.add('forced');

    // if (getDom('#wrapper').classList.contains('enlarged') && getDom('body').classList.contains('fixed-left')) {
    //   getDom('body')
    //     .classList.remove('fixed-left')
    //     getDom('body')
    //     .classList.add('fixed-left-void');
    // } else if (!getDom('#wrapper').classList.contains('enlarged') && getDom('body').classList.contains('fixed-left-void')) {
    //   getDom('body')
    //     .classList.remove('fixed-left-void')
    //   getDom('body')
    //     .classList.add('fixed-left');
    // }

    
  
    
    // getDom('body').classList.add('enlarged');
  }

  attachEvents(){
  	// var ua = navigator.userAgent,
   //  event = ua.match(/iP/i) ? 'touchstart' : 'click';
   //  let $this = this;
   //    //bind on click
   //  this.$openLeftBtn.addEventListener(event, function(e) {
   //    e.stopPropagation();
   //    $this.openLeftBar();
   //  });
  }
}

export default MenuToggler;