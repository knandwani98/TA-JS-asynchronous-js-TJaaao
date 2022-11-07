const todoForm = document.querySelector('.todo-form');
const todoBox = document.querySelector('.todo-box');
const root = document.querySelector('.root');

const url = `https://basic-todo-api.vercel.app/api/todo`;

function addTodo(title) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todo: {
        title: title,
        isCompleted: false,
      },
    }),
  }).then(getTodo);
}

function deleteTodo(id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(getTodo);
}

function editTodo(title, id, status = false) {
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todo: {
        title: title,
        isCompleted: status,
      },
    }),
  }).then(getTodo);
}

function editableText(e, elm, root) {
  let oldValue = e.target.innerText;
  let id = e.target.dataset.id;
  elm.style.display = 'none';
  let input = document.createElement('input');
  input.classList.add('edit-box');
  input.type = 'text';
  input.value = oldValue;
  root.append(input);
  input.addEventListener('blur', () => {
    let newValue = input.value;
    input.style.display = 'none';
    elm.style.display = 'block';
    elm.innerText = newValue;
    editTodo(newValue, id);
  });
}

function createUI(data = []) {
  root.innerHTML = '';
  data.forEach((todo) => {
    let li = document.createElement('li');
    li.classList.add('todo');
    li.classList.add('flex');
    let div = document.createElement('div');
    div.classList.add('flex');
    let input = document.createElement('input');
    input.classList.add('checkbox');
    input.type = 'checkbox';
    if (todo.isCompleted) {
      input.setAttribute('checked', true);
    }

    input.addEventListener('click', () => {
      todo.isCompleted = !todo.isCompleted;
      editTodo(todo.title, todo._id, todo.isCompleted);
    });

    let p = document.createElement('p');
    p.dataset.id = todo._id;
    p.innerText = todo.title;
    p.addEventListener('dblclick', (e) => {
      editableText(e, p, div);
    });

    let a = document.createElement('a');
    a.dataset.id = todo._id;
    a.addEventListener('click', (e) => {
      deleteTodo(e.target.dataset.id);
    });
    let img = document.createElement('img');
    img.dataset.id = todo._id;
    img.src = 'root/211652_close_icon.svg';
    img.alt = 'close-button';

    div.append(input, p);
    a.append(img);
    li.append(div, a);
    root.append(li);
  });
}

function getTodo() {
  fetch(url)
    .then((data) => data.json())
    .then((list) => list.todos)
    .then(createUI);
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let value = todoBox.value;
  todoBox.value = '';
  addTodo(value);
});

getTodo();
