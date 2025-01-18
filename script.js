function createID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const parts = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const newDate = new Intl.DateTimeFormat("pt-BR", parts).format(date);
  return newDate.replace(" ", " de ").replace(" às ", " - ");
}

function createLabel(text, id) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = text;
  return label;
}

function createInput(type, id) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  return input;
}

const arr = [
  {
    name: "Desenvolvimento de software",
    desc: "Planeja, sob supervisão, os requisitos de projeto de software de acordo com as necessidades do cliente. ",
    time: formatDate("2025-01-06T21:00"),
    id: createID(),
  },
  {
    name: "Desenvolvimento de algoritmo",
    desc: "Estrutura algoritmos com base na lógica computacional e nos requisitos funcionais descritos no projeto.",
    time: formatDate("2025-01-06T21:00"),
    id: createID(),
  },
  {
    name: "Manipulação de banco de dados",
    desc: "Elabora, sob supervisão, modelagem de dados de acordo com projeto de software.",
    time: formatDate("2025-01-06T21:00"),
    id: createID(),
  },
  {
    name: "Administração de banco de dados",
    desc: "Monitora desempenho do sistema de gerenciamento de banco de dados de acordo com os parâmetros definidos para o sistema.",
    time: formatDate("2025-01-06T21:00"),
    id: createID(),
  },
];

if (!localStorage.getItem("itens")) {
  localStorage.setItem("itens", JSON.stringify(arr));
}

function getItens() {
  return JSON.parse(localStorage.getItem("itens")) || [];
}

function createItem(item) {
  const itens = getItens();

  itens.push(item);
  localStorage.setItem("itens", JSON.stringify(itens));

  readItem();
}

function readItem() {
  const itens = getItens();
  const container = document.querySelector(".container");
  container.innerHTML = "";

  itens.forEach((item) => {
    const block = document.createElement("div");
    const name = document.createElement("h3");
    const desc = document.createElement("p");
    const time = document.createElement("time");
    const menu = document.createElement("button");

    time.textContent = item.time;
    name.textContent = item.name;
    desc.textContent = item.desc;
    menu.textContent = "menu";
    menu.addEventListener("click", () => {
      menuItem(item);
    });

    block.append(time, name, desc, menu);
    container.append(block);
  });
}

function updateItem(id, values) {
  const itens = getItens();
  const index = itens.findIndex((item) => item.id === id);

  itens[index] = { ...itens[index], ...values };
  localStorage.setItem("itens", JSON.stringify(itens));

  readItem();
}

function deleteItem(id) {
  const itens = getItens();
  const updatedItens = itens.filter((item) => item.id !== id);

  localStorage.setItem("itens", JSON.stringify(updatedItens));

  readItem();
}

const openModal = document.getElementById("create-item");
openModal.addEventListener("click", () => {
  createModal("Adicionar");
});

function createModal(origin, item) {
  const block = document.createElement("div");
  const timeLabel = createLabel("Data", "date");
  const timeInput = createInput("datetime-local", "date");
  const nameLabel = createLabel("Nome", "name");
  const nameInput = createInput("text", "name");
  const descLabel = createLabel("Descrição", "desc");
  const descInput = createInput("text", "desc");
  const button = document.createElement("button");

  button.className = "button";
  button.textContent = origin === "Editar" ? "Editar" : "Adicionar";

  if (origin === "Editar") {
    timeInput.value = item.time;
    nameInput.value = item.name;
    descInput.value = item.desc;
  }

  button.addEventListener("click", () => {
    const values = {
      time: formatDate(timeInput.value),
      name: nameInput.value,
      desc: descInput.value,
    };

    if (origin === "Adicionar") {
      values.id = createID();
      createItem(values);
    }
    if (origin === "Editar") {
      updateItem(item.id, values);
    }

    block.remove();
  });

  block.append(timeLabel, timeInput, nameLabel, nameInput, descLabel, descInput, button);
  document.body.append(block);
}

function menuItem(item) {
  const block = document.createElement("div");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  del.className = "button";
  del.textContent = "Deletar";
  del.addEventListener("click", () => {
    deleteItem(item.id);
    block.remove();
  });

  edit.className = "button";
  edit.textContent = "Editar";
  edit.addEventListener("click", () => {
    createModal(edit.textContent, item);
    block.remove();
  });

  block.append(del, edit);
  document.body.append(block);
}

readItem();
