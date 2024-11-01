//Onde os arquivos seram armazenados
export var archives = []

//Cria um novo elemento html
export function create(tag) {
    return document.createElement(tag)
}

//Apaga qualquer elemento que estiver ocupando a tela
export function clear(id) {

    const elements = document.querySelectorAll('#main > *')
    const element_exc = document.getElementById(id)

    elements.forEach(element =>{
        if(element !== element_exc){
            element.style.display = 'none'
        }
    })
}

//Apaga os elementos que estão ocupando a tela
export function close(){
    const elements = document.querySelectorAll('#main > *')

    elements.forEach(element =>{
        element.style.display = 'none'
    })

}

// converte uma string em um array
export function separate(str){
    const array = str.split(" ")
    return array
}