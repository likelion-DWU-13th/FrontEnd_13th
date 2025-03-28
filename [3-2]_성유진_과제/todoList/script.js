document.addEventListener('DOMContentLoaded', function() {
    /*DOMContentLoaded
    ==> <head>에서 스크립트를 포함하면,
        브라우저가 HTML요소들을 모두 로드하기 전에 스크립트가 실행
        addBtn 같은 요소들을 찾을 수 없어 null을 반환, 오류 발생 
    */
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.querySelector('#taskInput');

    // 버튼 클릭 이벤트 처리
    addBtn.addEventListener('click', function() {
        if (taskInput.value !== '') {
            createTodo();
        }
    });

    // "Enter" 키 입력 시 처리
    taskInput.addEventListener('keydown', function(event) {
        if (event.keyCode === 13 && taskInput.value !== '') {
            createTodo();
        }
    });
});

/*
const addBtn = document.getElementById('addBtn');

function keyCodeCheck(event){ //event 인수를 넘겨 받아 체크
    if(event.keyCode === 13 && taskInput.value !== '')
        createTodo();
}

addBtn.addEventListener('click', function(){
    if(taskInput.value !== '')
        createTodo();
    }
);
*/

function createTodo(){
    //todoList 안에 li로 할일 생성
    //createElement() = element creating method
    const todoList = document.querySelector('#todoList');
    const newLi = document.createElement('li'); //create li
    const newBtn = document.createElement('button'); // create button
    const newSpan = document.createElement('span'); // create span
    const todoInput = document.querySelector('#taskInput');

    //create newLi <-- append as child(newBtn&newSpan)
    //appendChild() : 선택한 요소 안에 자식요소를 추가한다
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);

    newSpan.textContent = todoInput.value; //textContent: 노드 내의 모든 텍스트 추출

    todoList.appendChild(newLi);        
    //console.log(todoList); // print newLi

    todoInput.value = '';//vaule 값에 빈 문자열 담기

    newBtn.addEventListener('click', function() {
        newLi.classList.toggle('complete');
    });   
}