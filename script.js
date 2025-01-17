const arr = [
  {
    id: 1,
    name: "Desenvolvimento de software",
    desc: "Planeja, sob supervisão, os requisitos de projeto de software de acordo com as necessidades do cliente. ",
  },
  {
    id: 2,
    name: "Desenvolvimento de algoritmo",
    desc: "Estrutura algoritmos com base na lógica computacional e nos requisitos funcionais descritos no projeto.",
  },
  {
    id: 3,
    name: "Manipulação de banco de dados",
    desc: "Elabora, sob supervisão, modelagem de dados de acordo com projeto de software.",
  },
  {
    id: 4,
    name: "Administração de banco de dados",
    desc: "Monitora desempenho do sistema de gerenciamento de banco de dados de acordo com os parâmetros definidos para o sistema.",
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
    const title = document.createElement("h3");
    const desc = document.createElement("p");

    title.textContent = item.name;
    desc.textContent = item.desc;

    block.append(title, desc);
    container.append(block);
  });
}

function updateItem(id, values) {
  const itens = getItens();
  const index = itens.findIndex((item) => item.id === id);

  if (index === -1) {
    console.log(`Objeto com id ${id} não encontrado.`);
    return;
  }

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

readItem();
