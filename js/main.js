
// tem q ficar no inicio 
// ---IIFE------

//const getPerso4 = () => ({name1: "italo", eyes1: "italo2"});
// essa const se refere apenas a esse scop 
//(function() {

    const getPerso4 = () => ({name1: "italo", eyes1: "italo2"});
    console.log(getPerso4())


//     function Person(){
//         this.year =  0;
//         setInterval(()=>{
//             // esse this se refere a ao scop criado no caso do windows ->function()
//              // esse this se refere a this local ->()=> no caso do Person
//             this.year = this.year + 1;
//            // console.log(this.year)
//         }, 1000)
//     }
//     const p1 = new Person();
//     A instanciação é um processo por meio do qual se realiza a cópia de um objeto (classe) existente
//      // instacia de obj
// })();

function soma(num1, num2){
    return num1 + num2;
}

// funçãoa anonima
const soma1 = function(num1, num2){
    return num1 + num2;
}
//arrow function ES6 
const  soma2 = (num1, num2) =>{
    return num1 + num2;
}

//arrow function ES6 SEM BIGODE 
const  soma3 = (num1, num2) => num1 + num2;

// parentes some quando tem um parametro e apenas.
const  conceito = num1 => num1;
// se colocar {} tem q ter o return

console.log(soma(2,4))
console.log(soma1(2,4))
console.log(soma2(2,4))
console.log(soma3(2,4))

console.log(conceito(4))

// criando json 

const getPerson = () => {
    return {name: "italo"}
}
console.log(getPerson())

//tirando  o return 

const getPerson2 = () => ({name: "italo", eyes: "italo"})

// usado () retorna todos os atributos do json
console.log(getPerson2())

// ---IIFE------

//const getPerso4 = () => ({name1: "italo", eyes1: "italo2"});
// essa const se refere apenas a esse scop 



// executar na inicialização
//}()) 


//==============================================================================
// evento da Api 
//var viaCep = fetch('https://viacep.com.br/ws/01001023/json/')
// .then(resposta => resposta.json()) // callback
// .then(r => {
//     console.log("entrou aqui");
//     if(r.erro){
//         console.log("entrou aqui2");
//         throw Error("NÃO EXISTE") // forçando o erro daqui vai direto pro catch
//     }else{
//         console.log("entrou aqui4");
//         console.log(r)
//     }
// })
// .catch(error => console.log(error)).finally();
var viaCep2 = fetch('https://viacep.com.br/ws/01001000/json/').then(e => e.json()).then(obj => console.log(obj))
console.log(viaCep2);


async function buscarEnderecos(cep){
    try{
        var viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`) // uma requisição assincrona mas visualmente sincrona espera cada item (ES-2017)
        var novoCep =  await viaCep.json()
        if(novoCep.erro){
            throw Error("erro no cep n exite")
        }
        return novoCep // quando sai da async volta como Promise -> precisa trranformar com PromiseAll e then
    }catch(erro){
        console.log(erro)

    }
}

let ceps = ['01001000','01001001','01001001', '01001001']
let variosCeps = ceps.map(ceps => buscarEnderecos(ceps))
console.log(variosCeps)

 Promise.all(variosCeps).then(variosCeps => console.log(variosCeps))

//======================================================

async function busEderecoId(cep){
    const erro = document.getElementById('erro');
    erro.innerHTML = "";
    try{
        var viaCep2 = await fetch(`https://viacep.com.br/ws/${cep}/json/`) // templade string
        var novoCep2 = await viaCep2.json()
         if(novoCep2.erro){
            erro.innerHTML = "<p> Invalido </p>";
            //Não é uma boa ideia deixar seu usuário errar sem explicar previamente o motivo do erro
            //As mensagens de erros tem que ser claras e próximas do conteúdo ou ação que causou o erro.
            throw Error("nao tem cep")
         }
         const endereco = document.getElementById('endereco')
         const bairro = document.getElementById('bairro')
         const cidade = document.getElementById('cidade')
         const estado = document.getElementById('estado')

         endereco.value = novoCep2.logradouro
         bairro.value = novoCep2.bairro
         cidade.value = novoCep2.localidade
         estado.value = novoCep2.uf

       console.log(novoCep2)
    }catch(error){
        erro.innerHTML = "<p> Invalido </p>";
        
        endereco.value = ""
        bairro.value = ""
        cidade.value = ""
        estado.value = "AC"
    }
}
//busEderecoId('01001001')


const cepId = document.getElementById('cep')
cepId.addEventListener('focusout', ()=>{
    busEderecoId(cepId.value)
    //console.log(Promise.all(variosCeps))
})
