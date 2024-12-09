const form = document.querySelector("#todo-form");
const tasktitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

// Array de objetos para salvar as tasks
let tasks = [];

function renderTaskOnHtml(tasktitle, done = false) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
      spanToToggle.style.color = "red";
    } else {
      spanToToggle.style.textDecoration = "none";
      spanToToggle.style.color = "black";
    }

    // Alterado estado do done ao marcar checkbox
    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }

      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement("span");
  span.textContent = tasktitle;
  if (done) {
    span.style.textDecoration = "line-through";
    span.style.color = "red";
  }

  const button = document.createElement("button");
  button.textContent = "delete";

  // Adiciona um evento no botao deletar para remover a tarefa ao clicar
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;
    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //Adicionando os componentes na li criada
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  // Adicionando a li no html da pagina
  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHtml(t.title, t.done);
  });
};

// Adicionando evento do tipo "submit" para criar uma task
form.addEventListener("submit", (event) => {
  event.preventDefault(); // -> evita o recarregamento da pagina ao submeter

  const tasktitle = tasktitleInput.value; // -> pega o valor do input

  // impende que seja adicionada uma tarefa com menos de 3 caracteres
  if (tasktitle.length < 3) {
    alert("Your task must have at least 3 characters!");
    return;
  }

  // Adiciona as propriedades titulo e concluido do objeto 'task' no array
  tasks.push({
    title: tasktitle,
    done: false,
  });
  // Salavando no local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHtml(tasktitle);
});
