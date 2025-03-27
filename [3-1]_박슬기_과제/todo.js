const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const toDoAllDel = document.getElementById("todo-all-delete")
const TODOS_KEY = "todos";

//투두리스트 저장하기
let toDos = [];

function saveTodos(){
   localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}


//모두 삭제
function allDel(event){
   const Listli = document.querySelectorAll("#todo-list li");
   
   if (Listli.length === 0){
      alert("삭제할 항목이 없습니다!");
      return;
   }

   for (let i = 0; i < Listli.length; i++){
      Listli[i].remove();
   }
   
   toDos = [];
   saveTodos();
}

toDoAllDel.addEventListener("click", allDel);

// 투두리스트 체크 효과
function checkTodo(event){
   const button = event.target;            
   const li = button.parentElement;  
   const span = li.querySelector("span");

   if(button.innerText === ""){
      button.innerText="✅";
      span.style.textDecoration = "line-through";
      span.style.color = "#bbb";
      button.style.backgroundColor = "#fdeff2";
   } else {
      button.innerText="";
      span.style.textDecoration = "none";
      span.style.color = "#333"; 
      button.style.backgroundColor = "#ffffff";
   }
}

// 새로운 todo 리스트 작성해서 값 가져오기
function paintTodo(newTodo){
   const li = document.createElement("li");
   li.id = newTodo.id;
   
   const span = document.createElement("span");
   span.innerText = newTodo.text;
   
   const button = document.createElement("button");
   button.innerText = "";
   button.addEventListener("click",checkTodo);

   li.appendChild(button);
   li.appendChild(span);
   toDoList.appendChild(li);
}

function handleTodoSubmit(event){
   event.preventDefault();
   const newTodo = toDoInput.value;

   if (newTodo === ""){
      alert("내용을 작성해주세요!");
      return
   }
   
    // 투두리스트를 작성하면 비워지는것
   toDoInput.value = "";
   
   const newTodoObj = {
      text:newTodo,
      id: Date.now(),
   };
   
   toDos.push(newTodoObj);
   paintTodo(newTodoObj);
   saveTodos();
}
toDoForm.addEventListener("submit", handleTodoSubmit);

// 화면에 저장되어있는 투두리스트 표시하기
const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;
   parsedToDos.forEach(paintTodo);
}

