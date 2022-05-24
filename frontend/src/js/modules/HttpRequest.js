import { API_URL } from "../config/Config"
import { 
	deleteUser, 
	getId, 
	displayError, 
	getAllCheckedValuesOf ,
	interpreteUserCategory
} from "../helpers/index"
window.getId = getId;
class HttpRequest{
	constructor(){
		this.url = API_URL;
		this.imageUrl = null;
	}
	attachEvents(){
	  let that = this;
	  
	  this.handleDisplay();
	  const imageUpload = document.getElementById('image-upload');
      const reportForm = document.getElementById("newUser")
	  imageUpload.addEventListener('change', that.uploadImage);
      reportForm.addEventListener('submit', that.handleCreate);
	 
	}

    handleDisplay(){ 
      this.url = API_URL+"/users";
      window.addEventListener('load', (event) => {
		  event.preventDefault();
		  let loader = document.querySelector('.loader');
		  const recordItems = document.querySelector('.users-lists');
		  loader.style.display = 'block';
          let res =``;
		  const record = (items) => {
		    items.forEach((item) => {
                let categoryRoles =interpreteUserCategory(item?.category);
		    	let badge ="label ";
		    	switch(categoryRoles){
                  case "SuperAdmin":
                     badge +="label-danger"
                     break

                  case "Employee":
                     badge +="label-primary"
                     break
                  case "Admin":
                     badge +="label-success"
                     break;
                  default:
                     badge +="label-info" 

		    	}
		    let dateFormat = new Date(item?.created_at);
		    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let formattedDate = `${dateFormat.getDate()} ${monthNames[dateFormat.getMonth()] }, ${dateFormat.getFullYear()}`;
		      const eachRecord = `<tr>
    <td  class="biodata">
    <a href="" class="leftbio">
    <div class="icon4">
          <img src=""  class="img-circle avatar">
          <b>${item?.firstname} ${item?.lastname}</b>
    <p> ${item?.email}</p>
     </div>
    
    </a> 
    <p class="rightbio ${badge}">${interpreteUserCategory(item?.category)}</p> </td>
    <td>${formattedDate}</td>
    <td>${interpreteUserCategory(item?.category)}</td>
    
    <td></td>
    <td>
      <a href="#" class="table-action-btn"><i data-role="edit" data-id="${item?.id}" id="edit_${item.id}" onclick="getId(this,event)" class="fa fa-edit"></i></a>
      <a href="#" class="table-action-btn"><i data-role="delete" data-id="${item?.id}" id="delete_${item.id}" onclick="getId(this,event)" class="fa fa-trash"></i></a>
    </td>
  </tr>`

		      res+= eachRecord;
		    });
		    recordItems.innerHTML += res
		  };

		  fetch(this.url, {
		      method: 'GET',
		      headers: {
		        Accept: 'application/json',
		        'Content-Type': 'application/json',
		        
		      },
		      mode: 'cors'
		    })
		    .then(response => response.json())
		    .then((data) => {
		    	//console.log(data.status)
		      if (Array.isArray(data.data) && data.data.length>0) {
		        let recordList = data.data;
		        recordList = [...new Set(recordList)];
		        loader.style.display = 'none';
		        record(recordList);
		        console.log(data);
		      } else {
		        loader.style.display = 'none';
		       
		      }
		    })
		    .catch((error) => {
		      throw error;
		    });
	 });
    }

   
   uploadImage = (event) => {
	const imageUpload = document.getElementById('image-upload');
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
	        this.imageUrl = data.secure_url;
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
    



    handleCreate(event){
       	  this.url =API_URL+"/users";
       	   event.preventDefault();
	      const reportForm = document.getElementById('reportForm');
	      const loader = document.querySelector('.loader');
	      const msgDiv = document.getElementById('msg-error');
	      const spinner = document.querySelector('.spinner');
	      const spin = document.querySelector('.spin');
	     
	      const firstname = document.getElementById('firstname').value;
	      const lastname = document.getElementById('lastname').value;
	      const email = document.getElementById('email').value;
	      const password = document.getElementById('password').value;
	      const confirmPassword = document.getElementById('confirmPassword').value;
	      const username = document.getElementById('username').value;
	      const employeeId = document.getElementById('employeeId').value;
	      const mobilePhone = document.getElementById('mobilePhone').value;
	      const avatar =  localStorage.getItem("imgurl"); // the api url for image stored in clouldinary
	      const select = document.getElementById('role');
	      const roleType = select.options[select.selectedIndex].value;
	      
	      let superAdminPreviledges = getAllCheckedValuesOf("super_admins");
	      let adminPreviledges = getAllCheckedValuesOf("admins");
	      let employeesPreviledges = getAllCheckedValuesOf("employees");
	      let hrPreviledges = getAllCheckedValuesOf("hr_admins");
          
          if (!(employeeId && employeeId.trim().length)) {
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


		  if (!(password && password.trim().length)) {
		    return displayError('Please enter a password',msgDiv);
		  }


		  if (!(confirmPassword && confirmPassword.trim().length)) {
		    return displayError('Password comfirmation do not match',msgDiv);
		  }


		  if (!( confirmPassword== password)) {
		    return displayError('Password comfirmation do not match',msgDiv);
		  }
          
          if (!(password.trim().length > 4 )) {
		    return displayError('Please enter a password greater than 4 in length',msgDiv);
		  }


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
	  let postUrl = API_URL + "/users";
	  fetch(postUrl, {
	      method: 'POST',
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
	
}

export default HttpRequest