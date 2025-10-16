let 
    modalOpenBtn = document.querySelector('.button-openModal');
    modalStatus = false;

modalOpenBtn.addEventListener('click', () => {
    if (!modalStatus) {
        document.querySelector('.modal').classList.remove('modal-noactive');
        modalOpenBtn.textContent = 'Закрыть окно';
        modalStatus = true;
    } else {
        document.querySelector('.modal').classList.add('modal-noactive');
        modalOpenBtn.textContent = 'Добавить задачу';
        modalStatus = false;
    };
});

let 
    todoInput = document.querySelector('.todo-input');
    todoAdd = document.querySelector('.todo-addBtn');
    todoList = document.querySelector('.todoList');

todoAdd.addEventListener('click', () => {
    let value = todoInput.value;
    if (value === '') {
        alert('Вы не ввели задачу!');
    } else {
    todoList.insertAdjacentHTML('afterbegin', `<li class="todo-chunk">
            <div>
                <input class="checkbox" type="checkbox">
                <span class="title">${value}</span>
            </div>

            <div>
                <button class="todoRemove">Удалить</button>
            </div>
        </li>`);
    todoInput.value = '';
    };
}); 

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        todoAdd.click();
    }
});

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('todoRemove')) {
        let todoChunk = event.target.closest('li');
        if (todoChunk) {
            todoChunk.remove();
        }
    };

    if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        const title = checkbox.nextElementSibling; 

        if (checkbox.checked) {
            title.classList.add('todo-win');
        } else {
            title.classList.remove('todo-win');
        }
    };
});

sortSelect.addEventListener('change', function () {
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


