// Dados iniciais
const jogadorasIniciais = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "img/andressa.png",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "img/dayane.png",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "img/mariza.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "img/thais.png",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "img/leticia.png",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

// Inicciando o LocalStorage
if (!localStorage.getItem("jogadoras")) {
  localStorage.setItem("jogadoras", JSON.stringify(jogadorasIniciais));
}

// Funções
function getJogadoras() {
  return JSON.parse(localStorage.getItem("jogadoras"));
}

function setJogadoras(lista) {
  localStorage.setItem("jogadoras", JSON.stringify(lista));
}

// Criandos os cards
function criaCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  const jogadoras = getJogadoras();

  jogadoras.forEach((j, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${j.foto}" alt="${j.nome}">
      <h3>${j.nome}</h3>
      <p><b>Posição:</b> ${j.posicao}</p>
      <p><b>Clube:</b> ${j.clube}</p>
      <p><b>Gols:</b> ${j.gols} | <b>Assistências:</b> ${j.assistencias} | <b>Jogos:</b> ${j.jogos}</p>
      <div class="actions">
        <button class="action edit" onclick="editarJogadora(${index})">Editar</button>
        <button class="action delete" onclick="removerJogadora(${index})">Excluir</button>
        <button class="action favorite ${j.favorita ? 'active' : ''}" onclick="favoritarJogadora(${index})">⭐</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// CREATE
document.getElementById("player-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const posicao = document.getElementById("posicao").value;
  const clube = document.getElementById("clube").value;
  const foto = document.getElementById("foto").value;
  const gols = parseInt(document.getElementById("gols").value);
  const assistencias = parseInt(document.getElementById("assistencias").value);
  const jogos = parseInt(document.getElementById("jogos").value);
  const editIndex = document.getElementById("edit-index").value;

  const jogadoras = getJogadoras();

  if (editIndex === "") {
    jogadoras.push({ nome, posicao, clube, foto, gols, assistencias, jogos, favorita: false });
    alert("Jogadora adicionada com sucesso!");
  } else {
    jogadoras[editIndex] = { nome, posicao, clube, foto, gols, assistencias, jogos, favorita: jogadoras[editIndex].favorita };
    alert("Jogadora editada com sucesso!");
  }

  setJogadoras(jogadoras);
  criaCards();
  this.reset();
  document.getElementById("edit-index").value = "";
});

// UPDATE
function editarJogadora(index) {
  const j = getJogadoras()[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("nome").value = j.nome;
  document.getElementById("posicao").value = j.posicao;
  document.getElementById("clube").value = j.clube;
  document.getElementById("foto").value = j.foto;
  document.getElementById("gols").value = j.gols;
  document.getElementById("assistencias").value = j.assistencias;
  document.getElementById("jogos").value = j.jogos;
}

// DELETE
function removerJogadora(index) {
  if (confirm("Tem certeza que deseja excluir esta jogadora?")) {
    const jogadoras = getJogadoras();
    jogadoras.splice(index, 1);
    setJogadoras(jogadoras);
    alert("Jogadora removida com sucesso!");
    criaCards();
  }
}

// Favoritando as jogadoras
function favoritarJogadora(index) {
  const jogadoras = getJogadoras();
  jogadoras[index].favorita = !jogadoras[index].favorita;
  setJogadoras(jogadoras);
  criaCards();
}

// Card inicial
criaCards();
