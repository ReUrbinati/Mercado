const produtos = [];
let idAtual = 0;

document.getElementById("produto-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let valorUnitario = parseFloat(document.getElementById("valor").value);
    let quantidade = parseInt(document.getElementById("quantidade").value, 10);

    if (!nome || isNaN(valorUnitario) || isNaN(quantidade)) {
        return;
    }

    let produto = {
        id: idAtual++, // ID único
        nome: nome,
        valorUnitario: valorUnitario,
        quantidade: quantidade,
        valorTotal: valorUnitario * quantidade
    };

    produtos.push(produto);
    atualizarNotaFiscal();
    document.getElementById("produto-form").reset(); // Limpa o formulário após adicionar
});

function atualizarNotaFiscal() {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = "";
    let totalCompra = 0;

    produtos.forEach(produto => {
        const item = document.createElement("li");
        item.innerHTML = `${produto.nome}: ${produto.quantidade} x R$ ${produto.valorUnitario.toFixed(2)} = R$ ${produto.valorTotal.toFixed(2)}
            <button onclick="editarProduto(${produto.id})">✏️ Editar</button>
            <button onclick="excluirProduto(${produto.id})">❌ Excluir</button>`;

        listaProdutos.appendChild(item);
        totalCompra += produto.valorTotal;
    });

    document.getElementById("total-compra").textContent = `R$ ${totalCompra.toFixed(2)}`;
}

function excluirProduto(id) {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        produtos.splice(index, 1); // Remove do array
        atualizarNotaFiscal();
    }
}

function editarProduto(id) {
    const produto = produtos.find(produto => produto.id === id);
    if (produto) {
        document.getElementById("nome").value = produto.nome;
        document.getElementById("valor").value = produto.valorUnitario;
        document.getElementById("quantidade").value = produto.quantidade;

        excluirProduto(id); // Remove o antigo antes de adicionar o editado
    }
}
