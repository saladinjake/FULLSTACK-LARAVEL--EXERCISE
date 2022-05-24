import { API_URL } from "../config/Config"
export const deleteUser =(id) =>{
   let recordUrl = API_URL + "/users/"+ id+"/delete";
  
   let loader = document.querySelector('.loader');
   loader.style.display = 'block';
   fetch(recordUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      }
    })
    .then(response => response.json())
    .then((data) => {
      //if (data.status === 202) {
        loader.style.display = 'none';
       
         window.location.reload()
        
      //}
    }).catch(err=> console.log(err));
}
export const viewEditMode = (id) =>{
  alert("called"+ id)
  //if(document.getElementById(id)){
    const modal = document.getElementById("editme_"+id);
    modal.classList.toggle("show-modal");
    var closeButton = document.getElementById("closeme_"+id);
    closeButton.addEventListener("click", ()=>{
       modal.classList.remove("show-modal");
    });
// window.addEventListener("click", windowOnClick);
var closeButton2 = document.getElementById("revert_"+id);

   closeButton2.addEventListener("click", ()=>{
       modal.classList.remove("show-modal");
    });
  //}
}


export const getId = (user,event) => {
      event.preventDefault()
      localStorage.setItem('Id', user.getAttribute("id"));
      localStorage.setItem('actionType', user.getAttribute("mode"));
     let id = user.getAttribute("data-id");
     
     if(user.getAttribute("data-role")=="delete"){
     	
        deleteUser(id);
     }else{
     	//show edit
        viewEditMode(id)
     }
}


// export const  prefetchRecord = async (url) =>{
//   const res = await fetch(url);
//   return res;
// } 
// export const formRefill = (jsonData) => {
//   const { elements } = document.querySelector('form')

//   for (const [ key, value ] of Object.entries(jsonData) ) {
//     const field = elements.namedItem(key)
//     field && (field.value = value)
//   }
// }



/*custom toast notification */

const showToastError = (msg,title="Error Notification") =>{
  let toast = new ToastNotification();
  toast = toast.getToast();
  toast.create({
     title: title,
     text: msg,
      
  });
}


class ToastNotification{
  constructor(){
    this.toast = {create:() =>{}, hide:()=>{}};
    this.autoincrement = 0;
    this.init();
    
  }

  getToast(){
    return this.toast
  }
  init() {
    // Toast container
    var container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    let that = this;

    // @Override
    // Replace create method when DOM has finished loading
    this.toast.create = function(options) {
      var toast = document.createElement('div');
      toast.id = ++that.autoincrement;
      toast.id = 'toast-' + toast.id;
      toast.className = 'toast-toast';

      // title
      if (options.title) {
        var h4 = document.createElement('h4');
        h4.className = 'toast-title';
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // text
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'toast-text';
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

      // icon
      if (options.icon) {
        var img = document.createElement('img');
        img.src = options.icon;
        img.className = 'toast-icon';
        toast.appendChild(img);
      }

      // click callback
      if (typeof options.callback === 'function') {
        toast.addEventListener('click', options.callback);
      }

      // toast api
      that.toast.hide = function() {
        toast.className += ' toast-fadeOut';
        toast.addEventListener('animationend', removeToast, false);
      };

      // autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      } 
      // else setTimeout(toast.hide, 2000);

      if (options.type) {
        toast.className += ' toast-' + options.type;
      }

      toast.addEventListener('click', toast.hide);


      function removeToast() {
        document.getElementById('toast-container').removeChild(toast);
      }

      document.getElementById('toast-container').appendChild(toast);
      return toast;

    }
  }
}


export const displayError = (message,msgDiv) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  para.style.paddingBottom = '8px';
  //msgDiv.appendChild(para);
   showToastError(message)
  //  toast.create({
  //    title: 'Error notification',
  //    text: message,
      
  // });
};

export const getAllCheckedValuesOf = (name) => {
  var checkeds = document.querySelectorAll('input[name="' + name + '"]:checked'),
    values = [];
    
  checkeds.forEach(function(chkd) {
    let keyValue ={}
    keyValue[chkd.getAttribute("key")] =chkd.value
    values.push(keyValue);
  });
  return values;
}




export const interpreteUserCategory = ($status) =>
    {
       if ($status == 'SUP') {
            return 'SuperAdmin';
        } else if ($status == 'ADM') {
            return 'Admin';
        } else if ($status == 'EMP') {
            return 'Employee';
        } else if ($status == 'HRM') {
            return 'HrAdmin';
        } else if ($status == 'HOD') {
            return 'Hod';
        
        } else if ($status == 'TML') {
            return 'TeamLead';
        
        }else if ($status == 'TMM') {
            return 'TeamMember';
        
        }else if ($status == 'DEV') {
            return 'Developer';
        
        }else {
            return 'Unassigned';
        }
    }