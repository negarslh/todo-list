const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");

todoBtn.addEventListener("click" , addTodo);
todoList.addEventListener("click" , checkRemove);
filterOption.addEventListener("click" , filterTodos);
document.addEventListener("DOMContentLoaded" , getLocalTodos);

function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
            <li>${todoInput.value}</li>
            <span><i class="far fa-check-square"></i></span>
            <span><i class="fas fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    savedLocalTodos(todoInput.value);
    todoInput.value = "";        
}

function checkRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    } else if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
}

function filterTodos(e) {
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        if(e.target.value === "all"){
            todo.style.display = "flex";
        }else if(e.target.value === "completed"){
            if(todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }else if(e.target.value === "uncompleted"){
            if(!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        } 
    });
}

function savedLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [] ;
    savedTodos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(savedTodos));
}

function getLocalTodos() {
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [] ;
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = `
            <li>${todo}</li>
            <span><i class="far fa-check-square"></i></span>
            <span><i class="fas fa-trash-alt"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [] ;
    const filteredTodos = savedTodos.filter((t) => t !== todo.children[0].innerText);
    localStorage.setItem("todos" , JSON.stringify(filteredTodos));
}