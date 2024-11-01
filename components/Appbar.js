import { create, clear } from "./crutch.js"

export class Appbar {
    constructor(id) {
        
        this.father = document.getElementById(id)

        this.element = create("div")
        this.element.id = "appbar"

        this.apps = ['Synotes','Syplayer','Synet']

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

    // Essa lista se refere somente aos botões do menu, e não aos itens em si
    components(){
        let app_list = create("ul")

        this.apps.forEach(app => {
            let item = create("li")
            let item_button = create("button")
            item_button.innerHTML = app
            item_button.id = app.toLowerCase() + 'b'
            item_button.classList.add("app-select")

            item.appendChild(item_button)
            app_list.appendChild(item)
        });

        this.element.appendChild(app_list)
    }

}