function createID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
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
  return new Intl.DateTimeFormat("pt-BR", parts).format(date).replace(" às ", " - ");
}

function breakDate(str) {
  const months = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  const [dayMonth, time] = str.split(" - ");
  const [day, monthName] = dayMonth.split(" de ");
  const [hour, minute] = time.split(":");

  const month = months[monthName.toLowerCase()];
  const year = new Date().getFullYear();

  const date = new Date(Date.UTC(year, month, parseInt(day), parseInt(hour), parseInt(minute)));
  date.setHours(date.getHours());

  return date.toISOString().slice(0, 16);
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

function createTextArea(id) {
  const textArea = document.createElement("textarea");
  textArea.id = id;
  textArea.name = id;
  return textArea;
}

function randomColor() {
  const letter = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 16)];
  }
  return color;
}

const arr = [
  {
    name: "Desenvolvimento de software",
    desc: "Planeja, sob supervisão, os requisitos de projeto de software de acordo com as necessidades do cliente.",
    time: formatDate("2025-01-16T18:00"),
    id: createID(),
  },
  {
    name: "Desenvolvimento de algoritmo",
    desc: "Estrutura algoritmos com base na lógica computacional e nos requisitos funcionais descritos no projeto.",
    time: formatDate("2025-01-23T18:00"),
    id: createID(),
  },
  {
    name: "Manipulação de banco de dados",
    desc: "Elabora, sob supervisão, modelagem de dados de acordo com projeto de software.",
    time: formatDate("2025-01-30T18:00"),
    id: createID(),
  },
  {
    name: "Administração de banco de dados",
    desc: "Monitora desempenho do sistema de gerenciamento de banco de dados de acordo com os parâmetros definidos para o sistema.",
    time: formatDate("2025-02-06T18:00"),
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
  const container = document.querySelector(".grid-itens");
  container.innerHTML = "";

  itens.forEach((item) => {
    const block = document.createElement("div");
    const circle = document.createElement("div");
    const line = document.createElement("div");
    const content = document.createElement("div");
    const name = document.createElement("h3");
    const desc = document.createElement("p");
    const time = document.createElement("time");
    const menu = document.createElement("button");

    block.className = "block-item";
    circle.className = "circle";
    line.className = "line";
    content.className = "content";
    time.className = "time";
    time.textContent = item.time;
    name.className = "name";
    name.textContent = item.name;
    desc.className = "desc";
    desc.textContent = item.desc;
    menu.className = "menu";
    menu.innerHTML = `
      <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4ZM8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4ZM14 4C13.45 4 12.9792 3.80417 12.5875 3.4125C12.1958 3.02083 12 2.55 12 2C12 1.45 12.1958 0.979167 12.5875 0.5875C12.9792 0.195833 13.45 0 14 0C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2C16 2.55 15.8042 3.02083 15.4125 3.4125C15.0208 3.80417 14.55 4 14 4Z" fill="#ADB5BD"/>
      </svg>`;
    menu.addEventListener("click", (e) => {
      menuModal(block, item);
      e.stopPropagation();
    });

    content.append(time, name, desc, menu);
    block.append(content, circle, line);
    container.append(block);
  });

  const add = document.createElement("button");
  add.className = "button-add open-modal";
  add.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9.16663 10.8333H4.16663V9.16666H9.16663V4.16666H10.8333V9.16666H15.8333V10.8333H10.8333V15.8333H9.16663V10.8333Z" fill="#212529"/>
                    </svg>
                  `;
  add.ariaLabel = "Adicionar item";
  container.append(add);

  const circle = document.querySelectorAll(".circle");
  circle.forEach((circle) => {
    circle.style.backgroundColor = randomColor();
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

function createModal(origin, item) {
  const overlay = document.createElement("div");
  const block = document.createElement("div");
  const header = document.createElement("div");
  const action = document.createElement("h3");
  const close = document.createElement("button");
  const timeLabel = createLabel("Data", "date");
  const timeInput = createInput("datetime-local", "date");
  const nameLabel = createLabel("Nome", "name");
  const nameInput = createInput("text", "name");
  const descLabel = createLabel("Descrição", "desc");
  const descTextArea = createTextArea("desc");
  const button = document.createElement("button");

  overlay.className = "overlay";
  block.className = "modal";
  header.className = "modal-header";
  action.className = "modal-action";
  action.textContent = origin === "Editar" ? "Editar item" : "Adicionar item";
  close.className = "modal-close";
  close.innerHTML = ` 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33329 15.8333L4.16663 14.6667L8.83329 9.99999L4.16663 5.33332L5.33329 4.16666L9.99996 8.83332L14.6666 4.16666L15.8333 5.33332L11.1666 9.99999L15.8333 14.6667L14.6666 15.8333L9.99996 11.1667L5.33329 15.8333Z" fill="#343A40"/>
    </svg>`;
  close.ariaLabel = "Fechar modal";
  close.addEventListener("click", () => overlay.remove());

  button.className = "button-menu";
  button.innerHTML = ` 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 5.83333V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H14.1667L17.5 5.83333ZM15.8333 6.54167L13.4583 4.16667H4.16667V15.8333H15.8333V6.54167ZM10 15C10.6944 15 11.2847 14.7569 11.7708 14.2708C12.2569 13.7847 12.5 13.1944 12.5 12.5C12.5 11.8056 12.2569 11.2153 11.7708 10.7292C11.2847 10.2431 10.6944 10 10 10C9.30556 10 8.71528 10.2431 8.22917 10.7292C7.74306 11.2153 7.5 11.8056 7.5 12.5C7.5 13.1944 7.74306 13.7847 8.22917 14.2708C8.71528 14.7569 9.30556 15 10 15ZM5 8.33333H12.5V5H5V8.33333ZM4.16667 6.54167V15.8333V4.16667V6.54167Z" fill="#343A40"/>
    </svg>
    Salvar`;

  if (origin === "Editar") {
    timeInput.value = breakDate(item.time);
    nameInput.value = item.name;
    descTextArea.value = item.desc;
  }

  button.addEventListener("click", () => {
    const values = {
      time: formatDate(timeInput.value),
      name: nameInput.value,
      desc: descTextArea.value,
    };

    if (origin === "Adicionar") {
      values.id = createID();
      createItem(values);
    }
    if (origin === "Editar") {
      updateItem(item.id, values);
    }

    overlay.remove();
  });

  overlay.append(block);
  header.append(action, close);
  block.append(header, timeLabel, timeInput, nameLabel, nameInput, descLabel, descTextArea, button);
  document.body.append(overlay);
}

function menuModal(block, item) {
  const modal = document.createElement("div");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  modal.className = "modal-menu";
  del.className = "button-menu";
  del.innerHTML = ` 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.83325 17.5C5.37492 17.5 4.98256 17.3368 4.65617 17.0104C4.32978 16.684 4.16659 16.2917 4.16659 15.8333V5H3.33325V3.33333H7.49992V2.5H12.4999V3.33333H16.6666V5H15.8333V15.8333C15.8333 16.2917 15.6701 16.684 15.3437 17.0104C15.0173 17.3368 14.6249 17.5 14.1666 17.5H5.83325ZM14.1666 5H5.83325V15.8333H14.1666V5ZM7.49992 14.1667H9.16659V6.66667H7.49992V14.1667ZM10.8333 14.1667H12.4999V6.66667H10.8333V14.1667Z" fill="#343A40"/>
    </svg>
    Deletar`;
  del.addEventListener("click", () => {
    deleteItem(item.id);
    block.remove();
  });

  edit.className = "button-menu";
  edit.innerHTML = ` 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.16667 15.8333H5.35417L13.5 7.6875L12.3125 6.5L4.16667 14.6458V15.8333ZM2.5 17.5V13.9583L13.5 2.97917C13.6667 2.82639 13.8507 2.70833 14.0521 2.625C14.2535 2.54167 14.4653 2.5 14.6875 2.5C14.9097 2.5 15.125 2.54167 15.3333 2.625C15.5417 2.70833 15.7222 2.83333 15.875 3L17.0208 4.16667C17.1875 4.31944 17.309 4.5 17.3854 4.70833C17.4618 4.91667 17.5 5.125 17.5 5.33333C17.5 5.55556 17.4618 5.76736 17.3854 5.96875C17.309 6.17014 17.1875 6.35417 17.0208 6.52083L6.04167 17.5H2.5ZM12.8958 7.10417L12.3125 6.5L13.5 7.6875L12.8958 7.10417Z" fill="#343A40"/>
    </svg>
    Editar`;
  edit.addEventListener("click", () => {
    createModal("Editar", item);
    modal.remove();
  });

  document.addEventListener("click", (event) => {
    if (!modal.contains(event.target) && !block.contains(event.target)) {
      modal.remove();
    }
  });

  modal.append(del, edit);
  block.append(modal);
}

readItem();

const openModal = document.querySelectorAll(".open-modal");
openModal.forEach((btn) => {
  btn.addEventListener("click", () => createModal("Adicionar"));
});
