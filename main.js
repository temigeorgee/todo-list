const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.querySelector('.item-list');
const input = document.getElementById('Input');
const add = document.getElementById('btn');
// variables
let LIST;
let id ;

// get item from localStorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST)
}else{ 
  LIST = []
  id = 0;
}
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.trash);
  })
}

//  clear the local localStorage
clear.addEventListener("click", function(){
  list.innerHTML = '';
  localStorage.clear();
});
// show today's date
let options ={weekday:'long', month:'short', day:'numeric'}
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options)

// add to do function

function addToDo(toDo,id,trash){
  if(trash){return;}
  const text = `<div class="item" id='${id}'>
                <input type="checkbox">
                <p class="text">${toDo}</p>
                <div class="item-icons">
                    <a href="#" class="delete-item item-icon"><i class="fa fa-times-circle fa-2x"  job ="delete" id="${id}"></i></a>
                    </div>
                    </div>`

const position = "beforeend";
 list.insertAdjacentHTML(position, text)
}

// add an item to the list using the enter key

document.addEventListener("keyup",function(event){
  if(event.keyCode == 13){
    const toDo = input.value;
  
    // if the input isn't empty
    if(toDo){
      addToDo(toDo, id, false);
    
      LIST.push({
        name : toDo,
        id : id,
        trash : false
      });
      // add item from localStorage
localStorage.setItem("TODO",JSON.stringify(LIST));
      id++;
    }
    input.value ="";
  }
})

  add.addEventListener("click",function(ev){
    const toDo = input.value;
  
    // if the input isn't empty
    if(toDo){
      addToDo(toDo, id, false);
    
      LIST.push({
        name : toDo,
        id : id,
        trash : false
      });
      // add item from localStorage
localStorage.setItem("TODO",JSON.stringify(LIST));
      id++;
    }
    input.value ="";
  }
  )


// remove to do
function removeToDo(element){
element.parentNode.parentNode.removeChild(element.parentNode);
LIST[element.id].trash = true;
var remItemList = document.querySelector('.item');
remItemList.remove();
}


// traget the items created dynamically
list.addEventListener("click", function(event){
   let element = event.target;
  const elementJob = element.attributes.job.value;   
  if(elementJob == "delete"){
    removeToDo(element)
  }
  
  // add item from localStorage
localStorage.setItem("TODO",JSON.stringify(LIST));
});