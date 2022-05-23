import { API_URL } from "../config/Config"
const getId = (user) => {
      localStorage.setItem('Id', user.id);
}

class HttpRequest{
	constructor(){
		this.url = API_URL;
	}
	attachEvents(){
	  this.handleDisplay();
	  this.handleCreate();
	  this.handleEdit();
	  this.handleDelete();

	}

    


    handleDisplay(){ 
      this.url += "/users";
      window.addEventListener('load', (event) => {
		  event.preventDefault();
		  
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
	
}