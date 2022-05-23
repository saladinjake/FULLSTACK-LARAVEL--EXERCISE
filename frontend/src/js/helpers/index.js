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
      if (data.status === 202) {
        loader.style.display = 'none';
       
        const recordType = data.data[0].type;
        window.location.reload()
        
      }
    });
}
export const getId = (user) => {
      localStorage.setItem('Id', user.getAttribute("id"));
      localStorage.setItem('actionType', user.getAttribute("mode"));
     
     if(user.getAttribute("mode")=="delete"){
     	let id = user.getAttribute("id");
        deleteUser(id);
     }else{
     	//file the display form
     }
}


export const displayError = (message) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  para.style.paddingBottom = '8px';
  msgDiv.appendChild(para);
};

export const getAllCheckedValuesOf = (name) => {
  var checkeds = document.querySelectorAll('input[name="' + name + '"]:checked'),
    values = [];
  checkeds.forEach(function(chkd) {
    values.push(chkd.value);
  });
  return values;
}
