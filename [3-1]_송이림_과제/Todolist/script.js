const toDoForm=document.getElementById("todo-form");
const toDoInput=document.querySelector("#todo-form input");
const toDoList=document.getElementById("todo-list");
const addBtn=document.querySelector("#addButton");
const delBtn=document.getElementById("deleteButton"); //변수 설정

const TODOS_KEY="toDos";

let toDos=[]; //toDo에 들어오는 텍스트 배열로 묶어 보관하기 위해 array 생성, let 사용해서 업데이트 가능하게->전에 있던 toDo를 복원

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos)); //localStorage에 저장될 때 string으로 저장->배열 형식을 값 부분에 저장하려면 string밖에 안됨->다시 배열로 바꿔줘야함(JSON.parse())
}

function deleteToDo(event){
    const li=event.target.parentElement; //(삭제)이벤트 발생 시 html li의 부모태그 지정
    li.remove(); //삭제
    toDos=toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //li의 id(parseInt로 인해 문자열->숫자)를 삭제->나머지 그대로 유지(filter된 새로운 리스트 생성된거나 마찬가지)
    saveToDos(); //저장 //toDos 배열 업데이트되니까 localStorage 저장된 데이터도 업데이트
}


function paintToDo(newTodo){
    const li=document.createElement("li"); //li 입력 시 html에서도 li태그 생성
    li.id=newTodo.id;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const span=document.createElement("span");
    span.innerText=newTodo.text; //span 안 텍스트가 newTodo의 텍스트
    const button=document.createElement("button"); //html에 button태그 생성
    button.innerText="X";
    button.addEventListener("click",deleteToDo); //button에서 이벤트 발생시 삭제 함수 실행
    li.appendChild(checkbox); //li태그 안 자식
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li); //html의 ul태그 안 자식 li
}

function handleToDoSubmit(event) { //텍스트 입력 저장->초기화
    event.preventDefault(); //새로고침 방지
    const newTodo=toDoInput.value; //초기화 이전에 적은 글 newTodo에 저장
    toDoInput.value=""; //enter눌렀을 때 글 초기화
    const newTodoObj={
        text:newTodo,
        id:Date.now(), //각 item에 고유의 id 부여하여 구별
    };
    toDos.push(newTodoObj); //id도 같이 push해야함
    paintToDo(newTodoObj); //submit 할 때마다 paintToDo(html ul->li->span 안 텍스트) 실행
    saveToDos();
}


toDoForm.addEventListener("submit",handleToDoSubmit);
addBtn.addEventListener("click", handleToDoSubmit);

const savedToDos=localStorage.getItem(TODOS_KEY);

if (savedToDos !== null){ //null값 빼고 return
    const parsedToDos=JSON.parse(savedToDos); //JSON.parse()통해 string->object로 저장
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);//array를 하나씩 paintToDo에 넣어줄 수 있음
}

delBtn.addEventListener("click", () => {
    toDoList.innerHTML="";
    toDos=[];
    saveToDos();
})


