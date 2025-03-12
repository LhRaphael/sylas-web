import { create, clear,rgbMain } from "./crutch.js";

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
        let background = create("div")
        background.id = "background-div"

        let backgroundText = create("span")
        backgroundText.id = 'background-text'
        backgroundText.innerText = "Background Color"

        let rangeList = create("div")
        rangeList.id = "background-range-list"

        let redRange = create("input")
        redRange.id = 'background-red-range'
        redRange.type = 'range'
        redRange.min = '0'
        redRange.max = '255'
        redRange.addEventListener('input', ()=>{
            rgbMain[0] = redRange.value
            this.father.style.backgroundImage = 'none'
            this.father.style.backgroundColor = 'rgb('+rgbMain[0]+','+rgbMain[1]+','+rgbMain[2]+')'
        })

        let greenRange = create("input")
        greenRange.id = 'background-green-range'
        greenRange.type = 'range'
        greenRange.min = '0'
        greenRange.max = '255'
        greenRange.addEventListener('input', ()=>{
            rgbMain[1] = greenRange.value
            this.father.style.backgroundImage = 'none'
            this.father.style.backgroundColor = 'rgb('+rgbMain[0]+','+rgbMain[1]+','+rgbMain[2]+')'
        })

        let blueRange = create("input")
        blueRange.id = 'background-blue-range'
        blueRange.type = 'range'
        blueRange.min = '0'
        blueRange.max = '255'
        blueRange.addEventListener('input',()=>{
            rgbMain[2] = blueRange.value
            this.father.style.backgroundImage = 'none'
            this.father.style.backgroundColor = 'rgb('+rgbMain[0]+','+rgbMain[1]+','+rgbMain[2]+')'
        })

        rangeList.appendChild(redRange)
        rangeList.appendChild(greenRange)
        rangeList.appendChild(blueRange)

        background.appendChild(backgroundText)
        background.appendChild(rangeList)
        this.element.appendChild(background)
        
    }

}