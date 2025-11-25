const cardContainer = document.querySelector("#card-container"); // Supondo que seu container de cards tenha o id="card-container"
const searchInput = document.querySelector("#search-input"); // Supondo que seu input de busca tenha o id="search-input"
const searchButton = document.querySelector("#botao-busca"); // Seleciona o botão de busca
let dados = [];

// Adiciona um "ouvinte" para o clique no botão de busca.
searchButton.addEventListener("click", () => {
    filtrarCards(searchInput.value);
});

// Permite buscar pressionando "Enter" no campo de input
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        filtrarCards(searchInput.value);
    }
});

// Inicia a busca pelos dados assim que a página carrega.
window.addEventListener("load", iniciarBusca);

async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json")
        dados = await resposta.json();
        // Não renderiza mais os cards ao carregar, apenas busca os dados.
        cardContainer.innerHTML = ""; 
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos

    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Ano de Criação:</strong> ${dado.ano_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank"> Saiba mais</a> `

         cardContainer.appendChild(article);
       
    }
}

function filtrarCards(termo) {
    const termoFormatado = termo.trim().toLowerCase();

    // Se a barra de pesquisa estiver vazia, mostra todos os cards e para a execução
    if (termoFormatado === "") { 
        cardContainer.innerHTML = ""; // Limpa a tela se a busca for vazia
        return;
    }

    // Caso contrário, executa o filtro
    const cardsFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoFormatado) || 
        dado.descricao.toLowerCase().includes(termoFormatado)
    );
    renderizarCards(cardsFiltrados);
}