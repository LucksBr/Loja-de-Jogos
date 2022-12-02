let buttonCarrinho = document.querySelector("#carrinho")
let modalCarrinho = document.querySelector("#modal-carrinho")
let buttonCloseCarrinho = document.querySelector("#close")
let buttonConcluirCompra = document.querySelector("#concluirCompra")
let body = document.body
let buttonMenu = document.querySelector("#menu")
let carrinhoON = false;

let menuNav = document.querySelector(".menuNav")
let buttonCloseMenuNav = document.querySelector("#closeNav")
let buttonCarrinhoNav = document.querySelector("#carrinhoNav")

let contentCarrinho = document.querySelector("#contentCarrinho")
let headerCarrinho = document.querySelector('.modalHeader')
let buttonVoltarCadastro = document.querySelector('#voltarCadastro')
let buttonCloseCadastro = document.querySelector('#closeCadastro')

let contentCadastro = document.querySelector("#contentCadastro")
let buttonFinalizar = document.querySelector("#buttonFinalizar")

let ativarContentCadastro = () => {
    contentCadastro.classList.remove("off")
}

let desativarContentCadastro = () => {
    contentCadastro.classList.add("off")
}


let ativarContentCarrinho = () => {
    contentCarrinho.classList.remove("off")
    headerCarrinho.classList.remove("off")
    
    
}

let desativarContentCarrinho = () => {
    contentCarrinho.classList.add("off")
    headerCarrinho.classList.add("off")
}

let ativarCarrinho = () => {
    if(!carrinhoON){
        modalCarrinho.classList.remove("carrinhoOff")
        modalCarrinho.classList.add("carrinhoOn")
        !carrinhoON
        body.style.overflowY = "hidden"
    } 

    renderizarItensNoCarrinho()
}

let removerCarrinho = () => {
    modalCarrinho.classList.remove("carrinhoOn")
    modalCarrinho.classList.add("carrinhoOff")
    !carrinhoON
    body.style.overflowY = "auto"
}

let abrirMenu = () => {
    menuNav.classList.remove("off")
}

let fecharMenu = () => {
    menuNav.classList.add("off")
}

buttonCarrinho.addEventListener('click',() => {

    ativarCarrinho()

})

buttonCloseCarrinho.addEventListener('click', () => {

    removerCarrinho()
    
})

modalCarrinho.addEventListener('click', (e) => {
    try{
        if(e.srcElement.className == "carrinhoOn"){
            removerCarrinho()
        }
    } catch(e){
        console.log(e)
    }
    

})

buttonMenu.addEventListener('click', () => {
    abrirMenu()
    body.style.overflowY = "hidden"
})

buttonCloseMenuNav.addEventListener('click', () => {
    fecharMenu()
    body.style.overflowY = "auto"
})

buttonCarrinhoNav.addEventListener('click', () => {
    ativarCarrinho()
    fecharMenu()
})

buttonVoltarCadastro.addEventListener('click', () => {
    ativarContentCarrinho()
    desativarContentCadastro()
})

buttonCloseCadastro.addEventListener('click', () => {
    removerCarrinho()
})

buttonConcluirCompra.addEventListener('click', () => {
    if(parseInt(quantidadeTotalCarrinho.innerHTML) > 0 ){
        ativarContentCadastro()
        desativarContentCarrinho()
    } else {
        alert("Você não pode concluir, pois o carrinho está vazio!")
    }
    
}) 

buttonFinalizar.addEventListener('click', () => {
    if(camposPrenchidos()){
        removerCarrinho()
        ativarContentCarrinho()
        desativarContentCadastro()
        cadastrarCompra()
    }
    
}) 