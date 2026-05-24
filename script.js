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

