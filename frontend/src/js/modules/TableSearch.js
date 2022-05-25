/*
*company: Binghr.io 
*@author : saladin jake
*@class: TableSearch
*@description search table rows
*@method: inputHandler, filter
*@method: attachEvents

*/

class TableSearch{
	constructor(){
		this.input = null;
		
	}

	inputHandler(e){
		console.log("searching table..")
	}


	filter(row) {
	}

	attachEvents(){
     let that = this;
      var inputs = document.getElementById('search');
      inputs.oninput = that.inputHandler
	  
	}

		
}

export default TableSearch