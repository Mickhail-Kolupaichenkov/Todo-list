// Объявление переменных
let modalOpenBtn = document.querySelector('.button-openModal');
let modalStatus = false;
let todoInput = document.querySelector('.todo-input');
let todoAdd = document.querySelector('.todo-addBtn');
let todoList = document.querySelector('.todoList');
let sortSelect = document.querySelector('select[name="Сортировать"]');

// Загрузка задач при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
});

// Функции для работы с LocalStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.todo-chunk').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            todoList.insertAdjacentHTML('afterbegin', `
                <li class="todo-chunk">
                    <div>
                        <input class="checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
                        <span class="title ${task.completed ? 'todo-win' : ''}">${task.text}</span>
                    </div>
                    <div>
                        <button class="todoRemove">Удалить</button>
                    </div>
                </li>
            `);
        });
    }
}

// Работа с модальным окном
modalOpenBtn.addEventListener('click', () => {
    if (!modalStatus) {
        document.querySelector('.modal').classList.remove('modal-noactive');
        modalOpenBtn.textContent = 'Закрыть окно';
        modalStatus = true;
    } else {
        document.querySelector('.modal').classList.add('modal-noactive');
        modalOpenBtn.textContent = 'Добавить задачу';
        modalStatus = false;
    }
});

// Закрытие модального окна по клику вне его
document.querySelector('.modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal')) {
        document.querySelector('.modal').classList.add('modal-noactive');
        modalOpenBtn.textContent = 'Добавить задачу';
        modalStatus = false;
    }
});

// Добавление задачи по нажатию Enter
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        todoAdd.click();
    }
});

// Добавление новой задачи
todoAdd.addEventListener('click', () => {
    let value = todoInput.value.trim();
    if (value === '') {
        alert('Вы не ввели задачу!');
    } else {
        todoList.insertAdjacentHTML('afterbegin', `
            <li class="todo-chunk">
                <div>
                    <input class="checkbox" type="checkbox">
                    <span class="title">${value}</span>
                </div>
                <div>
                    <button class="todoRemove">Удалить</button>
                </div>
            </li>
        `);
        todoInput.value = '';
        saveTasksToLocalStorage();  
    }
});

// Обработка кликов в списке задач (удаление и отметка выполнения)
todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('todoRemove')) {
        let todoChunk = event.target.closest('li');
        if (todoChunk) {
            todoChunk.remove();
            saveTasksToLocalStorage();
        }
    }

    if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        const title = checkbox.nextElementSibling; 

        if (checkbox.checked) {
            title.classList.add('todo-win');
        } else {
            title.classList.remove('todo-win');
        }
        saveTasksToLocalStorage();
    }
});

// Сортировка задач
sortSelect.addEventListener('change', function() {
    const allItems = document.querySelectorAll('.todo-chunk');
    
    allItems.forEach(item => {
        const isCompleted = item.querySelector('input[type="checkbox"]').checked;
        
        if (this.value === 'Показать все') {
            item.style.display = 'flex';
        } else if (this.value === 'Выполненные') {
            item.style.display = isCompleted ? 'flex' : 'none';
        } else if (this.value === 'Активные') {
            item.style.display = !isCompleted ? 'flex' : 'none';
        }
    });
});