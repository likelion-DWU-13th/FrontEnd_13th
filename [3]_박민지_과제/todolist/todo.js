const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input"); // == document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY ="todos"; 

let toDos = [];

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function completeToDo(event, button){
    const li = event.target.parentElement;

    var button = event.target; 
    if(button.innerText == "✖"){
            button.innerText = "✔";
        }
    else{
        button.innerText = "✖"
    }
    
   
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id; 

    var button = document.createElement("button");
    button.innerText = "✖"

    const span = document.createElement("span");
    span.innerText = newTodo.text;
    //버튼 선언-span 선언 순서로 하기기
   

    button.addEventListener("click", completeToDo); 

    // 버튼을 텍스트 앞에 배치
    li.appendChild(button);
    li.appendChild(span);
    
    toDoList.appendChild(li);

}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = " ";
    const newTodoObj = { 
        text:newTodo, 
        id: Date.now()
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY)


if (savedToDos) {
    try {
        const parsedToDos = JSON.parse(savedToDos) || []; // null 방지
        toDos = Array.isArray(parsedToDos) ? parsedToDos : []; // 배열인지 확인
        toDos.forEach(paintToDo); // 안전하게 반복문 실행
    } catch (error) {
        console.error("오류 발생:", error);
        toDos = []; // 오류 발생 시 안전한 기본값 설정
    }
}


//모두 삭제 버튼 추가
const deleteForm = document.getElementById("deleteAll");
deleteForm.addEventListener("click", handleToDoDelete);


function handleToDoDelete(event){
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";  
    localStorage.clear();  // 전체 localStorage 삭제
}

