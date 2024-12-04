
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
    if(task){
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
}

function drag(event){
    event.dataTransfer.setData("item", event.target.id);
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed="move";
    setTimeout(() => {
        event.target.classList.add('hidden');
    }, 0); 
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
    event.target.classList.remove('dragging','hidden');
    if (event.dataTransfer.dropEffect === "none") {
        event.target.remove();
    }
} 

const addCardBtn = document.getElementById('cardBtn');
addCardBtn.addEventListener('click',addCards);

this.cardIdCounter=3
function addCards(){
    
    let cardContainer = document.querySelector('#card-container');
    let cardName = window.prompt('Please enter card name');
    let description = window.prompt('Please enter description');
    if(cardName && description){
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('toDoCard');
    cardDiv.setAttribute('id',`card${++this.cardIdCounter}`);
    cardDiv.addEventListener('drop',drop);
    cardDiv.addEventListener('dragover',allowDrop);
    
    let cardHead=document.createElement('div');
    cardHead.classList.add('cardText');
    cardHead.innerText = cardName;
    let imgSpan = document.createElement('span');
    imgSpan.classList.add('imgSpan');
    let imgTag = document.createElement('img');
    imgTag.src = "./images/circle-plus-solid.svg";
    imgSpan.appendChild(imgTag);     
    cardHead.appendChild(imgSpan);

    imgSpan.addEventListener('click',() =>{
        addItems(imgSpan);
    })

    let cardDesc = document.createElement('div');
    cardDesc.classList.add('description');
    cardDesc.innerText=description;

    cardDiv.appendChild(cardHead);
    cardDiv.appendChild(cardDesc);
    cardContainer.insertBefore(cardDiv,document.querySelector('.btnClass'));

    const underline = document.createElement('div');
    underline.classList.add('hr');
    cardDiv.appendChild(underline);
    }
}

onLoad();