import { API_URL } from "../config/Config"
/*
*company: Binghr.io 
*@author : saladin jake
*@description delete user api
*@params: int id
*@returns void 
*/
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


/*
*company: Binghr.io 
*@author : saladin jake
*@description performs a delete or edit request based on user interaction
*@params: HTMLObject user
*@params: HTMLEEvent event
*@returns Function
*/
export const getId = (user,event) => {
      event.preventDefault()
      localStorage.setItem('Id', user.getAttribute("id"));
      localStorage.setItem('actionType', user.getAttribute("mode"));
     let id = user.getAttribute("data-id");
     
     if(user.getAttribute("data-role")=="delete"){
     	
       return deleteUser(id);
     }else{
     	//show edit
      return  viewEditMode(id)
     }
}




/*custom toast notification */
/*
*company: Binghr.io 
*@author : saladin jake
*@description toast error notifier
*@params: String msg
*@params: String title
*@returns void
*/

const showToastError = (msg,title="Error Notification") =>{
  let toast = new ToastNotification();
  toast = toast.getToast();
  toast.create({
     title: title,
     text: msg,
      
  });
}


/*
*company: Binghr.io 
*@author : saladin jake
*@description toast class
*@method: getToast
*@method: init
*@returns void
*/

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



/*
*company: Binghr.io 
*@author : saladin jake
*@description helper function to display form error
*@params: String msg
*@params: HTMLoBJECT div
*@returns void
*/

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

















/*
*company: Binghr.io 
*@author : saladin jake
*@description handles update request
*@params: HTMLOBJECT event
*@params: int id
*@returns void
*/


const handleUpdate = function(event,id){
  
    
      event.preventDefault();
      //const reportForm = document.getElementById(`${id}`+'reportForm');
      const loader = document.querySelector('.loader');
      const msgDiv = document.getElementById('msg-error');
      const spinner = document.querySelector('.spinner');
      const spin = document.querySelector('.spin');
     
      const firstname = document.getElementById(`${id}`+'firstname').value;
      const lastname = document.getElementById(`${id}`+'lastname').value;
      const email = document.getElementById(`${id}`+'email').value;
      const password = document.getElementById(`${id}`+'password').value;
      const confirmPassword = document.getElementById(`${id}`+'confirmPassword').value;
      const username = document.getElementById(`${id}`+'username').value;
      const employeeId = document.getElementById(`${id}`+'employeeId').value;
      const mobilePhone = document.getElementById(`${id}`+'mobilePhone').value;
      const avatar =  localStorage.getItem("imgurl"); // the api url for image stored in clouldinary
      const select = document.getElementById(`${id}`+'role');
      const roleType = select.options[select.selectedIndex].value;
      
      let superAdminPreviledges = getAllCheckedValuesOf(`${id}`+"super_admins");
      let adminPreviledges = getAllCheckedValuesOf(`${id}`+"admins");
      let employeesPreviledges = getAllCheckedValuesOf(`${id}`+"employees");
      let hrPreviledges = getAllCheckedValuesOf("hr_admins");
        
        if (!(employeeId && employeeId.trim().length) ) {
      return displayError('Please enter an employee id',msgDiv);
    }
  
    if (!(firstname && firstname.trim().length)) {
      return displayError('Please enter a firstname',msgDiv);
    }
    if (!(lastname && lastname.trim().length)) {
      return displayError('Please enter a lastname',msgDiv);
    }
    if (!(email && email.trim().length)) {
      return displayError('Please enter an email',msgDiv);
    }


    if (!(username && username.trim().length)) {
      return displayError('Please enter a username',msgDiv);
    }

     // user can leave password as blank to retain old password
    // if (!(password && password.trim().length)) {
    //   return displayError('Please enter a password',msgDiv);
    // }


    // if (!(confirmPassword && confirmPassword.trim().length)) {
    //   return displayError('Password comfirmation do not match',msgDiv);
    // }


    // if (!( confirmPassword== password)) {
    //   return displayError('Password comfirmation do not match',msgDiv);
    // }
        
    //     if (!(password.trim().length > 4 )) {
    //   return displayError('Please enter a password greater than 4 in length',msgDiv);
    // }


    if (!(roleType && roleType.trim().length)) {
      return displayError('Please select the user role',msgDiv);
    }



     if (!(avatar && avatar.trim().length)) {
      return displayError('Please select the user profile',msgDiv);
    }


      
  
    

  const info = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    mobilePhone,
    employeeId,
    roleType,
    avatar,
    superAdminPreviledges,
    adminPreviledges,
    employeesPreviledges,
    hrPreviledges
  };
  
  loader.style.display = 'block';
  let postUrl = API_URL+"/users/"+ id+"/edit";
  fetch(postUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
      mode: 'cors',
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then((data) => {
      let errors = data?.errors;
      console.log(data)
      if (!errors) {
        loader.style.display = 'none';
        window.location.reload()
      }  else {
        Object.keys(errors).forEach(keys =>{
          displayError(errors[keys][0],msgDiv);
        })
      }
    })
    .catch((error) => {
      throw error;
    });

}



/*
*company: Binghr.io 
*@author : saladin jake
*@description checkbox helper function gets all checked values of a checkbox named attrbute
*@method: getToast
*@method: init
*@returns void
*/


export const getAllCheckedValuesOf = (name) => {
  let checkeds = document.querySelectorAll('input[name="' + name + '"]:checked'),
  values = [];
    
  checkeds.forEach(function(chkd) {
    let keyValue ={}
    keyValue[chkd.getAttribute("data-role")] =chkd.value
    values.push(keyValue);
  });
  return values;
}




/*
*company: Binghr.io 
*@author : saladin jake
*@description updates user profile
*@param: HTMLObject events
*@returns void
*/



const changeImage = (event) => {
    const errMsg = document.querySelector('.image-msg');
    let spinner = document.querySelector('.loader');
      
  spinner.style.display = 'block';
    const displayImages = document.getElementById('displayImages');
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'yftnq9xd');
    // eslint-disable-next-line no-undef
    fetch('https://api.cloudinary.com/v1_1/djdsxql5q/image/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then((data) => {
        if (typeof data.secure_url !== 'undefined') {
          
          localStorage.setItem("imgurl",data.secure_url);
  //         displayImages.innerHTML += `<li class="image-list">
  //         <img src=${this.imageUrl} height="50" width="50" id="img"><span class="del-btn">&times;</span><i class="image-uploads" style="display:none">${imageUrl}</i>
  // </li>`;
          spinner.style.display = 'none';
          //imageUpload.value = '';
          ;
        } else {
          spinner.style.display = 'none';
          errMsg.style.display = 'block';
          errMsg.style.color = 'red';
          errMsg.innerHTML = 'Image failed to upload';
        }
      })
      .catch((error) => {
        throw error;
      });
  }
   


/*
*company: Binghr.io 
*@author : saladin jake
*@description modal view event handler for update reques
*@params: int id
*@returns void
*/



export const viewEditMode = (id) =>{
  
  
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

   // HANDLE UPLOAD OF IMAGE AVATAR IN EDIT MODE
  var imageHandler = document.getElementById("avatar_"+id);
  imageHandler.addEventListener("change",(evt) =>{
       changeImage(evt)
  })


   //HANDLE UPDATE BUTTON TO SAVE DATA
  var editButton = document.getElementById("update_"+id);
  editButton.addEventListener("click",(evt) =>{
     let id  = event.target.getAttribute("data-id")
     handleUpdate(evt,id)    
  })
}




/*
*company: Binghr.io 
*@author : saladin jake
*@description role acronym interpreter
*@params: string status
*@returns string
*/

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



