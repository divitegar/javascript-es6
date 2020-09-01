//all id element from index.html
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

immediateLoadEventListener();
//event function
function immediateLoadEventListener() {

    //get todos from local storage and view 
    document.addEventListener("DOMContentLoaded", getTodos);
    //event add todo
    todoForm.addEventListener("submit", addTodo);
    //event delete todo
    todoList.addEventListener("click", deleteTodo);
    //event delete all todo
    clearButton.addEventListener("click", clearTodos);
    //event filter todo
    filterInput.addEventListener("keyup", filterTodos);
}

//reusable code
function createTodoElement(value) {

    const li = document.createElement("li");

    //add class for element li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1"

    //add children in element li
    li.appendChild(document.createTextNode(value))

    //create delete button
    const a = document.createElement("a");

    //give property for a element
    a.href = "#";
    a.className = "badge badge-danger delete-todo";
    a.innerHTML = "Delete";

    // insert element a in children li
    li.appendChild(a)

    //input element li have been created with javascript
    todoList.appendChild(li)

}

function getItemFromLocalStorage() {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

//function get data from local storage
function getTodos(){
    const todos = getItemFromLocalStorage();

    todos.forEach((todo) => {
      
        createTodoElement(todo);
    })
}

//function for add todo
function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {
          //create li element
          createTodoElement(todoInput.value);

          addTodoLocalStorage(todoInput.value);
    
    todoInput.value = ""

    } else {
        alert("Form can not empty")
    }
}


//function add todo to local storage
function addTodoLocalStorage(todoInputValue){
        const todos = getItemFromLocalStorage();

        todos.push(todoInputValue)

        localStorage.setItem("todos", JSON.stringify(todos));

}

//function for delete todo
function deleteTodo(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-todo")) {
        if (confirm("is sure to delete?")) {
            const parent = e.target.parentElement;
            parent.remove();

            deleteTodoLocalStorage(parent)
        }
    }
}

//delete todo from local storage
function deleteTodoLocalStorage(deletedElement) {
     const todos = getItemFromLocalStorage(); //delete element parent todo (li)

     todos.forEach((todo, index) => {
         if (deletedElement.firstChild.textContent == todo) {
             todos.splice(index, 1)
         }
     })

     localStorage.setItem("todos", JSON.stringify(todos));
}

//function for clear todos
function clearTodos() {
    todoList.innerHTML = "";

    clearTodosLocalStorage();
}

//clear todos from local storage
function clearTodosLocalStorage() {
    localStorage.clear();
}

//function for filter todos
function filterTodos(e) {
    e.preventDefault();

    const filterText = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo-item")

    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();
        
        if(itemTe2xt.indexOf(filterText) != -1)  {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important;");
        }

        console.log(itemText)
    })
    // console.log(todoItems)
}

