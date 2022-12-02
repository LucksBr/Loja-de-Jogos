let listaProdutos = document.querySelector("#listaProdutos")
let quantidadeTotalCarrinho = document.querySelector("#quantidadeTotalCarrinho")
let valorTotalCarrinho = document.querySelector("#valorTotalCarrinho")
let produtosCadastrados = document.querySelector("#produtosCadastrados")


let campoCPF = document.querySelector("#cpf")
let campoNome = document.querySelector("#nome")
let campoMail = document.querySelector("#mail")
let campoCEP = document.querySelector("#cep")
let campoLogradouro = document.querySelector("#logradouro")
let campoEstado = document.querySelector("#estado")
let campoCidade = document.querySelector("#cidade")
let campoBairro = document.querySelector("#bairro")
let campoNumero = document.querySelector("#numero")

let campos = [campoCPF,campoNome,campoMail,campoCEP,campoLogradouro,campoEstado,campoCidade,campoBairro,campoNumero]


let renderizarItensNoCarrinho = () => {
    listaProdutos.innerHTML = ""
    produtosCadastrados.innerHTML = ""
    let totalQuantiade = 0
    let totalValor = 0

    if(getDados("carrinho").length != 0){

        let carrinho = getDados("carrinho")
        

        for (let index = 0; index < carrinho.length; index++) {
            
            let id = carrinho[index].id
            let nome = carrinho[index].nome
            let img = carrinho[index].img
            let preco = carrinho[index].preco
            let quantidade = carrinho[index].quantidade
            let precoTotal = quantidade * preco

            totalQuantiade += quantidade
            totalValor += precoTotal

            let itemCarrinho = `<div class="cardList">

                                    <div class="produto">
                                        <h3 class="titleList">${nome}</h3>
                                        <img src="${img}">
                                    </div>

                                    <div class="preco">
                                        <h3 class="titleList">Preço</h3>
                                        <p>${formatarValor(preco)}</p>
                                    </div>

                                    <div class="quantidade">
                                        <h3 class="titleList">Quantidade</h3>
                                        <p>${quantidade}</p>
                                    </div>

                                    <div class="cardOptions">
                                        <button class="menos" onClick="removerDoCarrinho(${id})">
                                            -
                                        </button>

                                        <button class="mais"  onClick="adicionarNoCarrinho(${id})">
                                            +
                                        </button>
                                    </div>

                                    <div class="total">
                                        <h3 class="titleList">Total</h3>
                                        <p>${formatarValor(precoTotal)}</p>
                                    </div>

                                    <div class="delete" onClick="removerItemDoCarrinho(${id})">
                                        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path class="lixeira" d="M4.51253 25.7382C3.77716 25.7382 3.12535 25.4596 2.5571 24.9025C1.98886 24.3454 1.70474 23.6992 1.70474 22.9638V4.17827H0V1.37047H7.25348V0H16.7465V1.37047H24V4.17827H22.2953V22.9638C22.2953 23.6992 22.0167 24.3454 21.4596 24.9025C20.9025 25.4596 20.2451 25.7382 19.4875 25.7382H4.51253ZM7.88858 20.2228H10.3621V6.85237H7.88858V20.2228ZM13.7047 20.2228H16.1783V6.85237H13.7047V20.2228Z" fill="#79D0C6"/>
                                            </svg> 
                                    </div>


                                </div>`
            
            let itemCadastro = `<div class="produtoCadastro">
                                    <p class="nome">${nome}</p>
                                    <div class="line"></div>
                                    <p class="quantidade">${quantidade}</p>
                                </div>`

            adicionarItemEmElementoHTML(listaProdutos, itemCarrinho)
            adicionarItemEmElementoHTML(produtosCadastrados, itemCadastro)
        }

        


    } else {
        listaProdutos.innerHTML = "<p>Nenhum Item Adcionado ao carrinho</p>"
    }

  
    mudarTotaisCarrinho(totalQuantiade,totalValor)
    
}

let mudarTotaisCarrinho = (quantidade, valor) => {
    quantidadeTotalCarrinho.innerHTML = `${quantidade}`
    valorTotalCarrinho.innerHTML = `${formatarValor(valor)}`
}

let removerItemDoCarrinho = (idProduto) => {

    let carrinho = getDados("carrinho")
    let produtos = getDados("produtos")

    let posicaoCarrinho = carrinho.findIndex(e => e.id == idProduto)
    let item = carrinho[posicaoCarrinho]

    carrinho.splice(posicaoCarrinho,1)

    let posicaoProdutos = produtos.findIndex(e => e.id == idProduto)

    if(posicaoProdutos != -1){
        produtos[posicaoProdutos].quantidade += item.quantidade
    } else {
        produtos.push(item)
    }

    setDados("carrinho", carrinho)
    setDados("produtos", produtos)
    renderizarItensNoCarrinho()
    renderizarProdutos()
}

let criarPessoa = () => {
    let pessoa = {
        cpf: campos[0].value,
        nome: campos[1].value,
        mail: campos[2].value,
        cep: campos[3].value,
        logradouro: campos[4].value,
        estado: campos[5].value,
        cidade: campos[6].value,
        bairro: campos[7].value,
        numero: campos[8].value
    }

    return pessoa
}

let camposPrenchidos = () => {
    let camposPrenchidos = true

    for (let index = 0; index < campos.length; index++) {
       if(campos[index].value == ""){

            alert("É necessario prencher todos os campos!")
            camposPrenchidos = false
            break
       }
        
    }

    return camposPrenchidos
}

let cadastrarCompra = () => {

        let cliente = criarPessoa()
        let clientes = getDados("clientes")
        
        let posicao = clientes.findIndex(e => e.cpf == campoCPF.value)
        if(posicao == -1){
            clientes.push(cliente)
            setDados("clientes",clientes)
        }

        campos.forEach(e => {
            e.value = ""
        })

        let compras = getDados("compras")

        let data = new Date()
        let horas = (data.getHours() > 9 ? "" : "0") + data.getHours()
        let minutos = (data.getMinutes() > 9 ? "" : "0") + data.getMinutes()

        let date = {
            mes : data.getMonth(),
            dia: (data.getDate() > 9 ? "" : "0") + data.getDate(),
            horas: horas + ":" + minutos 
        } 

        let carrinho = getDados("carrinho")
        let id = 0

        if(compras[compras.length - 1]){
            id = compras[compras.length - 1].id + 1
        } 

        let compra = {
            id: id,
            pessoa: cliente,
            data: date,
            produtos: carrinho
        }

        setDados("carrinho",[])

        compras.push(compra)
        setDados("compras",compras)
}

campoCPF.addEventListener("change", (e) => {
    let clientes = getDados("clientes")

    let valor = e.path[0].value
    let posicao = clientes.findIndex(e => e.cpf == valor)
    let nomeCampos = ["cpf","nome","mail","cep","logradouro","estado","cidade","bairro", "numero"]

    if(posicao != -1 ){
        
        campos.forEach((element,index) => {
            element.value = clientes[posicao][nomeCampos[index]]
        })


    } 
})
