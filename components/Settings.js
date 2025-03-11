import { create, clear } from "./crutch.js";

export class Settings{
    constructor (id){
        this.father = document.getElementById(id)
        
        this.element = create("div")
        this.element.id = "config"

    }

    show(){
        
        if(this.element.style.display == 'none'){
            clear(this.element.id)
            this.element.style.display = 'block'
        }
        else{
            this.element.style.display = 'none'
        }

    }

    init(){
        this.components()
        this.father.appendChild(this.element)
        this.element.style.display = 'none'
    }

    components(){

    }

}