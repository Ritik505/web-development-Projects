function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="todo-actions">
                <input type="checkbox">
                <span>${todoText}</span>
            </div>
            <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        `;

        document.getElementById('todoList').appendChild(li);
        todoInput.value = '';
    }
}

function deleteTodo(button) {
    button.parentElement.remove();
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
}); 