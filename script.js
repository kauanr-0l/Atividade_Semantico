const imgPersonagem = document.getElementById("imagem");
const titulo = document.getElementById("titulo-personagem");

const txtEspecie = document.getElementById("especie");
const txtStatus = document.getElementById("status");
const txtGenero = document.getElementById("genero");

const campoPesquisa = document.getElementById("pesquisa");

const btnPesquisar = document.getElementById("buscar");
const btnVoltar = document.getElementById("voltar");
const btnAvancar = document.getElementById("avancar");

let idAtual = 1;
let totalPersonagens = 826;

function mostrarPersonagem(personagem) {

    imgPersonagem.src = personagem.image;
    imgPersonagem.alt = personagem.name;

    titulo.textContent = personagem.name;

    txtEspecie.textContent = `Espécie: ${personagem.species}`;
    txtStatus.textContent = `Status: ${personagem.status}`;
    txtGenero.textContent = `Gênero: ${personagem.gender}`;

}

async function buscarPorId(id) {

    try {

        const resposta = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
        );

        if (!resposta.ok) {
            throw new Error();
        }

        const personagem = await resposta.json();

        mostrarPersonagem(personagem);

        idAtual = personagem.id;

    } catch {

        alert("Erro ao carregar personagem.");

    }

}

async function pesquisarPersonagem() {

    const nomeDigitado = campoPesquisa.value.trim();

    if (nomeDigitado === "") {

        alert("Digite o nome de um personagem.");

        campoPesquisa.focus();

        return;
    }

    try {

        const resposta = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${nomeDigitado}`
        );

        if (!resposta.ok) {
            throw new Error();
        }

        const dados = await resposta.json();

        const personagem = dados.results[0];

        mostrarPersonagem(personagem);

        idAtual = personagem.id;

    } catch {

        alert("Personagem não encontrado.");

    }

}

btnPesquisar.addEventListener("click", pesquisarPersonagem);

campoPesquisa.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {
        pesquisarPersonagem();
    }

});

btnAvancar.addEventListener("click", () => {

    if (idAtual >= totalPersonagens) {

        idAtual = 1;

    } else {

        idAtual++;

    }

    buscarPorId(idAtual);

});

btnVoltar.addEventListener("click", () => {

    if (idAtual <= 1) {

        idAtual = totalPersonagens;

    } else {

        idAtual--;

    }

    buscarPorId(idAtual);

});

buscarPorId(1);