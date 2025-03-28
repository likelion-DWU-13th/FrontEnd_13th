const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const addButton = document.getElementById("addButton");
const delButton = document.getElementById("delButton");
const TODOS_KEY = "todos";


let toDos = [];

function saveTodos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos)); //이거 따로 공부해보기
}

function deleteToDo(event){
    const li = event.target.parentElement; //event.target은 눌린곳 위치를 전달해줌 솔직히 이해안됨
    toDos = toDos.filter((toDo) =>toDo.id !== parseInt(li.id));        //parseInt 는 string을 number로 바꿔줌
    li.remove();
    saveTodos();
} 

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id= newTodo.id;
    const checkBox=document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "check";
    const span = document.createElement("span");
    span.innerText=newTodo.text;
    const button = document.createElement("button");
    button.innerText="삭제";
    button.addEventListener("click",deleteToDo);
    li.appendChild(checkBox);
    li.appendChild(span);//li는 span이라는 자식을 갖게됨
    li.appendChild(button); //append는 마지막에 있어야함
    toDoList.appendChild(li);
}

function handleToDosubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    if (newTodo === "") { 
        alert("입력을 해주세요");
        return;
    }
    toDoInput.value="";
    const newToDoObj = { text:newTodo, id:Date.now() };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveTodos();
}

//전체삭제 함수
function deleteAll() { 
    const delList = toDoList.querySelectorAll('li');
    for ( let i = 0; i < delList.length; i++){
        delList[i].remove();
    }
    toDos = [];
    saveTodos();
}

toDoForm.addEventListener("submit",handleToDosubmit);
addButton.addEventListener("click",handleToDosubmit);
delButton.addEventListener("click",deleteAll);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) { //새로고침해도 사라지지 않음
    const parsedTODos = JSON.parse(savedToDos);
    toDos = parsedTODos;
    parsedTODos.forEach(paintToDo);
}