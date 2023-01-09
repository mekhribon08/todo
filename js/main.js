const elTodoForm = document.querySelector("[data-todo-form]");
const elTodoItems = document.querySelector("[data-todo-items]");
const elTodoItemTemplate = document.querySelector("[data-todo-item-template]");

const todos = getTodos();
// const todo = {
//   title: "",
//   dueDate: new Date(),
//   createdAt: new Date(),
//   isDone: false
// }

renderTodos();

elTodoItems.addEventListener("click", (evt) => {
  if (!evt.target.matches("[data-delete]")) return;

  const todoId = evt.target.dataset.id;
  deleteTodo(todoId);
});

elTodoItems.addEventListener("change", (evt) => {
  const todoId = evt.target.dataset.id;

  toggleTodo(todoId);
});

elTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(elTodoForm);

  const todo = {};
  todo.title = formData.get("title");
  todo.dueDate = new Date(formData.get("dueDate"));
  todo.createdAt = new Date(Date.now());
  todo.isDone = false;
  todo.id = todos.length + 1;

  addTodo(todo);
});

function addTodo(todo) {
  todos.push(todo);

  renderTodos();
}

function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === +id);

  todos.splice(index, 1);
  renderTodos();
}

function toggleTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (+id === todos[i].id) {
      todos[i].isDone = !todos[i].isDone;
      break;
    }
  }

  renderTodos();
}

function renderTodos() {
  elTodoItems.innerHTML = "";
  const todoItemsEls = [];

  todos.forEach((todo) => {
    const elTodoItem = elTodoItemTemplate.content.cloneNode(true);

    elTodoItem.querySelector("[data-is-done]").checked = todo.isDone;
    elTodoItem.querySelector("[data-is-done]").id = `todo-${todo.id}`;
    elTodoItem.querySelector("[data-title]").textContent = todo.title;
    elTodoItem
      .querySelector("[data-title]")
      .setAttribute("for", `todo-${todo.id}`);
    const dueDate = new Date(todo.dueDate);
    const createdAt = new Date(todo.createdAt);
    elTodoItem.querySelector(
      "[data-due-date]"
    ).textContent = `${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString()}`;
    elTodoItem.querySelector(
      "[data-created-at]"
    ).textContent = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

    elTodoItem.querySelectorAll("[data-id]").forEach((el) => {
      el.dataset.id = todo.id;
    });

    todoItemsEls.push(elTodoItem);
  });

  elTodoItems.append(...todoItemsEls);
  setTodos(todos);
}

function getTodos() {
  const stringTodos = localStorage.getItem("todos") || "[]";
  return JSON.parse(stringTodos);
}

function setTodos() {
  const stringTodos = JSON.stringify(todos);
  localStorage.setItem("todos", stringTodos);
}
