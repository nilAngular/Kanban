
function onLoad(){
    const addBtn = document.querySelectorAll('.imgSpan');
    addBtn.forEach(btn =>{
        btn.addEventListener('click',() =>{
            addItems(btn);
        });
    })
    
}

this.idCounter = 0;
function addItems(btn){
    let task = window.prompt("Please enter task name");
    const toDoCardId = btn.parentNode.parentNode.id;
    const toDoCardDiv = document.querySelector(`#${btn.parentNode.parentNode.id}`);

    const divEle = document.createElement('div');
    divEle.classList.add('itemCard');
    /*added drag attributes*/
    divEle.setAttribute('id',`${toDoCardId}+item${++this.idCounter}}`)
    divEle.setAttribute("draggable","true");
    divEle.addEventListener('dragstart',drag);
    divEle.addEventListener('dragend', dragEnd);
    /*end drag attributes*/
    toDoCardDiv.appendChild(divEle);
    console.log(divEle);
    
    const spanEle = document.createElement('span');
    spanEle.innerText =task;
    spanEle.classList.add('itemText');
    divEle.appendChild(spanEle);   

}

function drag(event){
    event.dataTransfer.setData("item", event.target.id);
    event.dataTransfer.effectAllowed="move"
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("item");
    const draggedElement = document.getElementById(data);

    // Check if drop happened inside a valid toDoCard
    if (ev.target.classList.contains('toDoCard') || ev.target.closest('.toDoCard')) {
        ev.target.closest('.toDoCard').appendChild(draggedElement);
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

function dragEnd(event){
    if (event.dataTransfer.dropEffect === "none") {
        event.target.remove();
    }
} 

onLoad();