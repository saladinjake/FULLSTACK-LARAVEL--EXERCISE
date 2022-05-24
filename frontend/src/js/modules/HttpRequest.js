import { API_URL } from "../config/Config"
import { 
	deleteUser, 
	getId, 
	displayError, 
	getAllCheckedValuesOf 
} from "../helpers/index"

class HttpRequest{
	constructor(){
		this.url = API_URL;
	}
	attachEvents(){
		let that = this;
	  this.handleDisplay();
	  // const reportForm = document.getElementById("newUser")
   //    reportForm.addEventListener('submit', that.postRecord);
	 
	}

    handleDisplay(){ 
      this.url = API_URL+"/users";
      // window.addEventListener('load', (event) => {
		  event.preventDefault();
		  let loader = document.querySelector('.loader');
		  const recordItems = document.querySelector('.users-lists');
		  loader.style.display = 'block';
          let res =``;
		  const record = (items) => {
		    items.forEach((item) => {
		      const eachRecord = `<tr>
    <td><a href="" class=""><b>${item?.firstname} ${item?.lastname}</b></a> <span class="label label-success">Admin</span></td>
    <td>${item?.created_at}</td>
    <td>${item?.role}</td>
    
    <td></td>
    <td>
      <a href="#" class="table-action-btn"><i data-id="${item?.id}" id="edit_${item.id}" onclick="getId(this)" class="fa fa-edit"></i></a>
      <a href="#" class="table-action-btn"><i data-id="${item?.id}" id="delete_${item.id}" onclick="getId(this)" class="fa fa-trash"></i></a>
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
		    	console.log(data.status)
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
	 // });
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
	      
	      const select = document.getElementById('role');
	      const roleType = select.options[select.selectedIndex].value;
	      
	      let superAdminPreviledges = getAllCheckedValuesOf("super_admins");
	      let adminPreviledges = getAllCheckedValuesOf("admins");
	      let employeesPreviledges = getAllCheckedValuesOf("employees");
	      let hrPreviledges = getAllCheckedValuesOf("hr_admins");
	  
		  if (!(firstname && firstname.trim().length)) {
		    return displayError('Please enter a firstname');
		  }
		  if (!(lastname && lastname.trim().length)) {
		    return displayError('Please enter a lastname');
		  }
		  if (!(email && email.trim().length)) {
		    return displayError('Please enter an email');
		  }

		  if (!(username && username.trim().length)) {
		    return displayError('Please enter a username');
		  }

		  if (!(employeeId && employeeId.trim().length)) {
		    return displayError('Please enter an employee id');
		  }

		  if (!(roleType && roleType.trim().length)) {
		    return displayError('Please select the user role');
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
	    superAdminPreviledges,
	    adminPreviledges,
	    employeesPreviledges,
	    hrPreviledges
	  };
	  
	  loader.style.display = 'block';
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
	      if (data.status === 201) {
	        loader.style.display = 'none';
	        resetForm();
	        localStorage.setItem('urlType', postUrl);
	        redirect(reportType);
	      }  else {
	        msgDiv.style.display = 'block';
	        msgDiv.style.color = 'red';
	        loader.style.display = 'none';
	        msgDiv.innerHTML = data.error;
	      }
	    })
	    .catch((error) => {
	      throw error;
	    });


  }
	
}

export default HttpRequest