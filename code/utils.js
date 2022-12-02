const lista = [
    {
        id: 1,
        nome: "God Of war",
        quantidade: "10",
        preco: 300,
        img: "images/god.png"
    },
    {
        id: 2,
        nome: "Metro",
        quantidade: "10",
        preco: 160,
        img: "images/metro.png"
    },
    {
        id: 3,
        nome: "Dark Souls",
        quantidade: "10",
        preco: 240.5,
        img: "images/dark.png"
    },
    {
        id: 4,
        nome: "The Last Of Us",
        quantidade: "10",
        preco: 80,
        img: "images/last.png"
    },
    {
        id: 5,
        nome: "Red Dead",
        quantidade: "10",
        preco: 330,
        img: "images/red.png"
    },
    {
        id: 6,
        nome: "The Witcher",
        quantidade: "10",
        preco: 50,
        img: "images/witcher.png"
    },
    
]

let getDados = (nomeChave) =>{
    
    if  (window.localStorage){
        let aux = JSON.parse(
            localStorage.getItem(nomeChave));
        let dados;
        if (aux != null){
           dados = aux;
        }
        else{
            dados = [];
        }
        return dados;
    }
    else{
        alert("operacao não disponível");        
    }
    return false;
}

let setDados = (nomeChave, conteudo) => {
    if (window.localStorage){        
        let dados = JSON.stringify(conteudo);
        localStorage.setItem(nomeChave,dados);
        //alert(dados);
    }
    else{
        alert("Operação não disponível.");
    }
}

let apagarLocalStorage = () => {
    localStorage.clear();
}

let formatarValor = (numero) => {
    
    return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(numero);
        
}

let listaDeProdutosIniciais = () => {
    

    return lista
}

let adicionarItemEmElementoHTML = (elemento, item) => {

    elemento.innerHTML += item

}