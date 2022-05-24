import { API_URL } from "../config/Config"
export const deleteUser =(id) =>{
   let recordUrl = API_URL + "/users/"+ id+"/delete";
   alert(recordUrl)
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
export const getId = (user,event) => {
      event.preventDefault()
      localStorage.setItem('Id', user.getAttribute("id"));
      localStorage.setItem('actionType', user.getAttribute("mode"));
     let id = user.getAttribute("data-id");
     alert(user.getAttribute("data-role"))
     if(user.getAttribute("data-role")=="delete"){
     	
        deleteUser(id);
     }else{
     	//file the display form
      //let url =  API_URL+ `/users/${id}/edit`
      //formRefill(prefetchRecord().data);
     }
}


export const  prefetchRecord = async (url) =>{
  const res = await fetch(url);
  return res;
} 
export const formRefill = (jsonData) => {
  const { elements } = document.querySelector('form')

  for (const [ key, value ] of Object.entries(jsonData) ) {
    const field = elements.namedItem(key)
    field && (field.value = value)
  }
}


export const displayError = (message,msgDiv) => {
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
        } else if ($status == 'HR') {
            return 'HR';
        } else {
            return 'Employee';
        }
    }