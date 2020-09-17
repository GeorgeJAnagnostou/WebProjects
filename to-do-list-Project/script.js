let input = document.getElementById('userInput');
var enter = document.getElementById('enter-button');
var list = document.getElementById('task-list');
var items = document.getElementsByTagName('li');
var label = document.querySelector('label');
let counter = 0;

const addTask = () => {
    var li = document.createElement('li');
    li.innerHTML = input.value;

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    li.appendChild(deleteButton);
    list.appendChild(li);
    input.value = '';
    const removeItem = () => {
        li.classList.add('delete');
        checkTooManyItems();
    }

    deleteButton.addEventListener('click', removeItem);

    const finishedTask = () => {
        li.classList.toggle('crossout');
        checkTooManyItems();
    }

    li.addEventListener('click', finishedTask);

    const checkTooManyItems = () => {
        for(let i = 0; i < items.length; i++){
            if(items[i].classList.value === ""){
                counter++;
            }
            if(counter > 5){
                label.style.visibility = 'visible';
                label.style.marginTop = '-20px';
            } else {
                label.style.marginTop = '5px';
                label.style.visibility = 'hidden';
            }
        }
        counter = 0; 
    }
    checkTooManyItems();
}


const addTaskClick = () => {
    if (input.value.length > 0) {
        addTask();
    }
}

function addTaskKeypress(event) {
    if (input.value.length > 0 && event.which === 13) {
        addTask();
    }
}

enter.addEventListener('click', addTaskClick);
input.addEventListener('keypress', addTaskKeypress);