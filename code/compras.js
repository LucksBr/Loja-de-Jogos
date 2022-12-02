let buttonCloseModalCompras = document.querySelector("#closeComprasModal")
let modalCompras = document.querySelector(".modalCompras")
let listaCompras = document.querySelector("#lista")
let listProduto = document.querySelector("#listProdutos")
let valorTotalCadastroModal = document.querySelector("#valorTotalCadastro")

let campoComprasNome = document.querySelector("#Nome")
let campoComprasEmail = document.querySelector("#Email")
let campoComprasCEP = document.querySelector("#CEP")
let campoComprasEstado = document.querySelector("#Estado")
let campoComprasNumero = document.querySelector("#Numero")
let campoComprasCPF = document.querySelector("#CPF")
let campoComprasLogradouro = document.querySelector("#Logradouro")
let campoComprasBairro = document.querySelector("#Bairro")
let campoComprasCidade = document.querySelector("#Cidade")
let campoComprasMes = document.querySelector("#Mes")
let campoComprasDia = document.querySelector("#Dia")
let campoComprasHoras = document.querySelector("#Horas")



let desativarModalCompras = () => {
    modalCompras.classList.add("off")
}

let ativarModalCompras = (idCompra) => {
    modalCompras.classList.remove("off")
    renderizarDadosCompra(idCompra)
}


buttonCloseModalCompras.addEventListener('click', () => {
    desativarModalCompras()
})

let renderizarItensNaListaDeCompras = () => {
    listaCompras.innerHTML = ""

    let compras = getDados("compras")

    for (let index = 0; index < compras.length; index++) {

        let valorTotal = 0

        compras[index].produtos.forEach(e => {
            valorTotal += e.quantidade * e.preco
        });

        let item = `<div class="produtoList">
                        <div class="lineList">
                            <p>Cliente:  ${compras[index].pessoa.nome} </p>
                            <div class="about" onclick="ativarModalCompras(${compras[index].id})">
                                i
                            </div>
                        </div>
                        
                        <p>CPF: ${compras[index].pessoa.cpf}</p>

                        <p>Valor da Compra: ${formatarValor(valorTotal)}</p>

                    </div>`

            adicionarItemEmElementoHTML(listaCompras,item)
        
    }
}

let renderizarDadosCompra = (idCompra) => {
    let compras = getDados("compras")

    let posicao = compras.findIndex(e => e.id == idCompra)

    campoComprasNome.innerText = "Nome:  " + compras[posicao].pessoa.nome
    campoComprasEmail.innerText = "Email:  " + compras[posicao].pessoa.mail
    campoComprasCEP.innerText =  "CEP:  " + compras[posicao].pessoa.cep
    campoComprasEstado.innerText = "Estado:  " + compras[posicao].pessoa.estado
    campoComprasNumero.innerText =  "Número:  " + compras[posicao].pessoa.numero
    campoComprasCPF.innerText =  "CPF:  " + compras[posicao].pessoa.cpf
    campoComprasLogradouro.innerText =  "Logradouro:  " + compras[posicao].pessoa.logradouro
    campoComprasBairro.innerText = "Bairro:  " + compras[posicao].pessoa.bairro
    campoComprasCidade.innerText =  "Cidade:  " + compras[posicao].pessoa.cidade
    campoComprasMes.innerText = "Mês:  " + compras[posicao].data.mes
    campoComprasDia.innerText =  "Dia:  " + compras[posicao].data.dia
    campoComprasHoras.innerText = "Horas:  " + compras[posicao].data.horas

    renderizarItensDadosCompras(compras[posicao].produtos)
}

let renderizarItensDadosCompras = (produtos) => {

    listProduto.innerHTML = ""

    let totalValor = 0
    produtos.forEach((e,i) => {
        let totalValorItem = e.quantidade * e.preco
        totalValor += totalValorItem

        let item = `<div class="compraProduto">
                    <p>Produto: ${e.nome}</p>
                    <p>Quantidade: ${e.quantidade}</p>
                    <p>Valor: ${formatarValor(e.preco)}</p>
                    <p>Valor total: ${formatarValor(totalValorItem)}</p>
                </div>`

        
        adicionarItemEmElementoHTML(listProduto,item)
        
    })

    valorTotalCadastroModal.innerText = `${formatarValor(totalValor)}`
}
