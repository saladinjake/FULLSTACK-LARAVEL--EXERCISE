import { API_URL } from "../config/Config"

const deleteUser =(id) =>{
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
      if (data.status === 202) {
        loader.style.display = 'none';
       
        const recordType = data.data[0].type;
        window.location.reload()
        
      }
    });
}
const getId = (user) => {
      localStorage.setItem('Id', user.getAttribute("id"));
      localStorage.setItem('actionType', user.getAttribute("mode"));
     
     if(user.getAttribute("mode")=="delete"){
     	let id = user.getAttribute("id");
        deleteUser(id);
     }else{
     	//file the display form
     }
}


const displayError = (message) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  para.style.paddingBottom = '8px';
  msgDiv.appendChild(para);
};

function getAllCheckedValuesOf(name) {
  var checkeds = document.querySelectorAll('input[name="' + name + '"]:checked'),
    values = [];
  checkeds.forEach(function(chkd) {
    values.push(chkd.value);
  });
  return values;
}

class HttpRequest{
	constructor(){
		this.url = API_URL;
	}
	attachEvents(){
		let that = this;
	  this.handleDisplay();
	  const reportForm = document.getElementById("newUser")
      reportForm.addEventListener('submit', that.postRecord);
	  this.handleEdit();
	  this.handleDelete();

	}

    


    handleDisplay(){ 
      this.url = API_URL+"/users";
      window.addEventListener('load', (event) => {
		  event.preventDefault();
		  let loader = document.querySelector('.loader');
		  const recordItems = document.querySelector('.users-lists');
		  loader.style.display = 'block';

		  const record = (items) => {
		    items.forEach((item) => {
		      const eachRecord = `<tr>
    <td><a href="" class=""><b>${item?.firsname} ${item?.lastname}</b></a> <span class="label label-success">Admin</span></td>
    <td>${item?.created_at}</td>
    <td>${item?.role}</td>
    
    <td></td>
    <td>
      <a href="#" class="table-action-btn"><i data-id="${item?.id}" id="edit_${item.id}" onclick="getId(this)" class="fa fa-edit"></i></a>
      <a href="#" class="table-action-btn"><i data-id="${item?.id}" id="delete_${item.id}" onclick="getId(this)" class="fa fa-trash"></i></a>
    </td>
  </tr>`

		      recordItems.innerHTML += eachRecord;
		    });
		  };

		  fetch(redFlag, {
		      method: 'GET',
		      headers: {
		        Accept: 'application/json',
		        'Content-Type': 'application/json',
		        
		      },
		      mode: 'cors'
		    })
		    .then(response => response.json())
		    .then((data) => {
		      if (data.status === 200) {
		        const recordList = data.data[0].users;
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
	      let hrPreviledges = getAllCheckedValuesOf("hrs");
	  
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