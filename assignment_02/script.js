const todos = [
  { text: "운동하기", done: true },
  { text: "밥먹기", done: false },
];

let selectedIndex = null;

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const item = document.createElement("div");
    item.className =
      "todo-item" +
      (todo.done ? " done" : "") +
      (selectedIndex === index ? " selected" : "");

    const left = document.createElement("div");
    left.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.onchange = () => {
      todo.done = checkbox.checked;
      renderTodos();
    };

    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    input.readOnly = true;
    input.className = "todo-text" + (todo.done ? " done" : "");

    input.onclick = () => {
      selectedIndex = index;
      renderTodos();
    };

    left.appendChild(checkbox);
    left.appendChild(input);

    const btns = document.createElement("div");
    btns.className = "buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "btn";
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => {
      if (input.readOnly) {
        input.readOnly = false;
        input.focus();
      } else {
        input.readOnly = true;
        todo.text = input.value;
      }
    };

    const delBtn = document.createElement("button");
    delBtn.className = "btn";
    delBtn.innerHTML = "🚫";
    delBtn.onclick = () => {
      todos.splice(index, 1);
      if (selectedIndex === index) selectedIndex = null;
      renderTodos();
    };

    btns.appendChild(editBtn);
    btns.appendChild(delBtn);

    item.appendChild(left);
    item.appendChild(btns);
    list.appendChild(item);
  });
}

function addTodo() {
  todos.unshift({ text: "새로운 TODO", done: false });
  selectedIndex = todos.length - 1;
  renderTodos();
}

renderTodos();
