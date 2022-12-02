let tabelaProdutos = document.querySelector("#produtos")

let adicionarNoCarrinho = (idProduto) => {

    let produtos = getDados("produtos")

    for (let i = 0; i < produtos.length; i++) {
        


        if(produtos[i].id == idProduto){
            if(produtos[i].quantidade > 0){

                produtos[i].quantidade--

                let carrinho = getDados("carrinho")

                let index = carrinho.findIndex(e => e.id == idProduto)
            
                if(index != -1){

                    carrinho[index].quantidade++

                } else {
                    carrinho.push({
                        id: produtos[i].id,
                        nome: produtos[i].nome,
                        quantidade: 1,
                        preco: produtos[i].preco,
                        img: produtos[i].img,
                    })
                }
            
                setDados("carrinho",carrinho)
                setDados("produtos", produtos)
            } else {
                produtos.splice(i,1)
                setDados("produtos", produtos)
                renderizarProdutos()
            }
        }
        
    }


    renderizarItensNoCarrinho()
}

let removerDoCarrinho = (idProduto) => {
    let carrinho = getDados("carrinho")
    let produtos = getDados("produtos")

    let posicao = carrinho.findIndex(e => e.id == idProduto)

    if(posicao != -1){

        if(carrinho[posicao].quantidade > 1){
            carrinho[posicao].quantidade--

        } else if(carrinho[posicao].quantidade == 1){
            carrinho.splice(posicao,1)
        }

        setDados("carrinho",carrinho)

        let posicaoProdutos = produtos.findIndex(e => e.id == idProduto)

        if(posicaoProdutos != -1){
            produtos[posicaoProdutos].quantidade++
        } else {

            let posicaoLista = lista.findIndex(e => e.id == idProduto)


            produtos.push(
                {
                    id: lista[posicaoLista].id,
                    nome: lista[posicaoLista].nome,
                    quantidade: 1,
                    preco: lista[posicaoLista].preco,
                    img: lista[posicaoLista].img,
                }
            )
        }

        setDados("produtos", produtos)

    }else{
        alert("Não existem itens desse tipo no carrinho!")
    }

    renderizarProdutos()
    renderizarItensNoCarrinho()
}


let renderizarProdutos = () => {

    if(!(getDados("produtos") == [])){
        let produtos = getDados("produtos")
        tabelaProdutos.innerHTML = ""

        if(produtos.length == 0 ){
            adicionarItemEmElementoHTML(tabelaProdutos,"<p class='aviso'>0 produtos disponiveis! Recarregue a Pagina para ter acesso a mais itens!</p>")
        }

        for (let index = 0; index < produtos.length; index++) {

            let nome = produtos[index].nome
            let image = produtos[index].img
            let preco = formatarValor(produtos[index].preco)
            let id = produtos[index].id

            let card = `<div class="card">
                    <div class="cardHeader">
                        <h3>${nome}</h3>
                    </div>

                    <div class="cardBody">
                        <img class="capaGame" src="${image}" alt="">
                        <p>${preco}</p>

                        <div class="options">
                            <button class="menos" onClick="removerDoCarrinho(${id})">
                                -
                             </button>

                            <button class="mais" onClick="adicionarNoCarrinho(${id})">
                                +
                            </button>
                        </div>
                    </div>
                </div>`

            adicionarItemEmElementoHTML(tabelaProdutos,card)
            
        }
    } 
}



if(getDados("produtos").length == 0){
    setDados("produtos", listaDeProdutosIniciais())
} 