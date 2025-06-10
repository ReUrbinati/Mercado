const produtos = [];
document.getElementById("produto-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let valorUnitario = parseFloat(document.getElementById("valor").value);
    let quantidade = parseInt(document.getElementById("quantidade").value, 10);

    if (!nome || isNaN(valorUnitario) || isNaN(quantidade)) {
        return;
    }

    let produto = {
        nome: nome,
        valorUnitario: valorUnitario,
        quantidade: quantidade,
        valorTotal: valorUnitario * quantidade
    };

    produtos.push(produto);
    atualizarNotaFiscal();
});

function atualizarNotaFiscal() {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = "";
    let totalCompra = 0;

    produtos.forEach(produto => {
        const item = document.createElement("li");
        item.textContent = `${produto.nome}: ${produto.quantidade} x R$ ${produto.valorUnitario.toFixed(2)} = R$ ${produto.valorTotal.toFixed(2)}`;
        listaProdutos.appendChild(item);
        totalCompra += produto.valorTotal;
    });

    document.getElementById("total-compra").textContent = `R$ ${totalCompra.toFixed(2)}`;
}