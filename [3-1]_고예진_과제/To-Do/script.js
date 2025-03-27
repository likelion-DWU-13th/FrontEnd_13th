const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');

// 리스트에 할 일 그리기
function paintToDo(newTodo, listId) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    // 할 일 삭제
    button.innerText = "❌";
    button.classList.add("delete-btn");
    button.addEventListener("click", () => {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(button);

    const targetList = document.getElementById(listId);
    targetList.appendChild(li);
}

// 중요도별 버튼 클릭 처리
function addTodo(listId) {
    const newToDo = toDoInput.value.trim();
    if (newToDo === "") return;
    toDoInput.value = "";
    paintToDo(newToDo, listId);
}

// 버튼 이벤트 설정
document.getElementById("very").addEventListener("click", () => addTodo("very-list"));
document.getElementById("imprt").addEventListener("click", () => addTodo("imprt-list"));
document.getElementById("not").addEventListener("click", () => addTodo("not-list"));
document.getElementById("todo").addEventListener("click", () => addTodo("todo-list"));

// submit은 무시
toDoForm.addEventListener("submit", (e) => e.preventDefault());
