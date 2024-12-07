let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');
let todos = [];

// Load todos from localStorage on page load
window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
};

// Add a new todo
button.addEventListener('click', () => {
    if (input.value.trim() === '') return;
    todos.push(input.value);
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodoToDOM(input.value);
    input.value = '';
});

// Add todo to the DOM
function addTodoToDOM(todo) {
    let todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    let taskText = document.createElement('p');
    taskText.innerText = todo;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Delete button click event
    deleteBtn.addEventListener('click', () => {
        todoItem.classList.add('fade-out');
        setTimeout(() => {
            todoList.removeChild(todoItem);
            removeTodoFromStorage(todo);
        }, 300); // Match the animation duration
    });

    todoItem.appendChild(taskText);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}

// Remove todo from localStorage
function removeTodoFromStorage(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}
