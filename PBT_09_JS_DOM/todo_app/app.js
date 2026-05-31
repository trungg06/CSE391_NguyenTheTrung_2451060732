const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    todoList.innerHTML = ''; // Reset list
    
    let filteredTodos = todos;
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.style.flex = "1";
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '❌';

        li.append(span, editInput, delBtn);
        todoList.append(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// 1. Thêm Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        todoInput.value = '';
        saveTodos();
        render();
    }
});

// 2. Event Delegation trên todoList (Toggle, Xóa, Edit)
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
    } else if (e.target.tagName === 'SPAN') {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
    }
    saveTodos();
    render();
});

// 3. Double click để Edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'SPAN') {
        const li = e.target.closest('li');
        li.classList.add('editing');
        li.querySelector('.edit-input').focus();
    }
});

// 4. Save Edit bằng phím Enter hoặc blur
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        const id = Number(e.target.closest('li').dataset.id);
        const newText = e.target.value.trim();
        if (newText) {
            todos.find(t => t.id === id).text = newText;
            saveTodos();
            render();
        }
    }
});

todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit-input')) {
        render(); // Thoát edit nếu mất focus
    }
});

// 5. Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// 6. Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

// Khởi chạy
render();