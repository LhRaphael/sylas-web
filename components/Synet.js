import { create, clear, close } from "./crutch.js"

export class Synet {
    constructor(id) {
        this.father = document.getElementById(id)

        this.element = create("div")
        this.element.id = "synet"
        this.element.classList.add("gcse-search")
    }

    show(){
        // essa variável foi criada porque por alguma razão a função não funciona se usar o elemento direto
        let app = document.getElementById("synet")
        if(app.style.display == 'none'){
            app.style.display = 'block'
        }
        else{
            app.style.display = 'none'
        }

    }

    init(){
        this.components()
        this.father.appendChild(this.element)
        
    }

    components(){
        let script = document.createElement("script")
        script.async = true
        script.src = "https://cse.google.com/cse.js?cx=3014a2d2fdfee432d"

        this.element.appendChild(script)
    }

}