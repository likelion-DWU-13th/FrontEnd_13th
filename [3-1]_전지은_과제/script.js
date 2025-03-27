const todoLists = JSON.parse(localStorage.getItem('todoLists')) || {};
let currentDate = new Date(); // 현재 날짜

function formatDate(date) {
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
}

function renderCurrentDate() {
    document.getElementById('current-date').textContent = formatDate(currentDate);
    renderTodoList();
}

function renderTodoList() {
    const dateKey = formatDate(currentDate);
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = ''; // 기존 목록 초기화

    const todos = todoLists[dateKey] || []; // 현재 날짜의 할 일 목록 가져오기
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            li.remove();
            const index = todos.indexOf(todo);
            if (index > -1) {
                todos.splice(index, 1); // 할 일 목록에서 삭제
            }
            saveToLocalStorage();
        };

        li.appendChild(deleteButton);
        li.onclick = function () {
            li.classList.toggle('completed');
            saveToLocalStorage();
        };

        todoListElement.appendChild(li);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('todoLists', JSON.stringify(todoLists)); // 할 일 목록 저장
}

document.getElementById('add').addEventListener('click', function() {
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();

    if (todoText) {
        const dateKey = formatDate(currentDate);
        if (!todoLists[dateKey]) {
            todoLists[dateKey] = [];
        }
        todoLists[dateKey].push({ text: todoText });
        renderCurrentDate();
        input.value = '';
    } else {
        alert('할 일이 있을텐데...'); // 입력이 없을 때 경고
    }
});

// 날짜 변경 버튼 기능
document.getElementById('prev-date').addEventListener('click', function () {
    currentDate.setDate(currentDate.getDate() - 1);
    renderCurrentDate();
});

document.getElementById('next-date').addEventListener('click', function () {
    currentDate.setDate(currentDate.getDate() + 1);
    renderCurrentDate();
});

renderCurrentDate();