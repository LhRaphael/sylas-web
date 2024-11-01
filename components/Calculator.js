import { create, clear } from "./crutch.js"

export class Calculator {
    constructor(id) {
        this.father = document.getElementById(id)
        
        this.element = create("div")
        this.element.id = "calculator"

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
        //tela da calculadora
        let display = create("div")
        display.id = "display-calculator"

        let up = create("div")
        up.id = "up-display-calculator"

        let down = create("div")
        down.id = "down-display-calculator"

        //Atribuição dos elementos
        display.appendChild(up)
        display.appendChild(down)
        this.element.appendChild(display)

        // área dos botões
        let buttons = create("div")
        buttons.id = "buttons-calculator"

        let zero = create("button")
        zero.innerHTML = "0"
        zero.id = "zero-calculator"
        zero.classList.add("buttons-calculator")
        zero.addEventListener('click',()=>{
            up.innerHTML += '0'
            this.resolution(up.innerHTML)
        })

        let one = create("button")
        one.innerHTML = "1"
        one.id = "one-calculator"
        one.classList.add("buttons-calculator")
        one.addEventListener('click',()=>{
            up.innerHTML += '1'
            this.resolution(up.innerHTML)

        })

        let two = create("button")
        two.innerHTML = "2"
        two.id = "two-calculator"
        two.classList.add("buttons-calculator")
        two.addEventListener('click',()=>{
            up.innerHTML += '2'
            this.resolution(up.innerHTML)

        })

        let three = create("button")
        three.innerHTML = "3"
        three.id = "three-calculator"
        three.classList.add("buttons-calculator")
        three.addEventListener('click',()=>{
            up.innerHTML += '3'
            this.resolution(up.innerHTML)

        })

        let four = create("button")
        four.innerHTML = "4"
        four.id = "four-calculator"
        four.classList.add("buttons-calculator")
        four.addEventListener('click',()=>{
            up.innerHTML += '4'
            this.resolution(up.innerHTML)

        })

        let five = create("button")
        five.innerHTML = "5"
        five.id = "five-calculator"
        five.classList.add("buttons-calculator")
        five.addEventListener('click',()=>{
            up.innerHTML += '5'
            this.resolution(up.innerHTML)

        })

        let six = create("button")
        six.innerHTML = "6"
        six.id = "six-calculator"
        six.classList.add("buttons-calculator")
        six.addEventListener('click',()=>{
            up.innerHTML += '6'
            this.resolution(up.innerHTML)

        })

        let seven = create("button")
        seven.innerHTML = "7"
        seven.id = "seven-calculator"
        seven.classList.add("buttons-calculator")
        seven.addEventListener('click',()=>{
            up.innerHTML += '7'
            this.resolution(up.innerHTML)

        })

        let eight = create("button")
        eight.innerHTML = "8"
        eight.id = "eight-calculator"
        eight.classList.add("buttons-calculator")
        eight.addEventListener('click',()=>{
            up.innerHTML += '8'
            this.resolution(up.innerHTML)

        })

        let nine = create("button")
        nine.innerHTML = "9"
        nine.id = "nine-calculator"
        nine.classList.add("buttons-calculator")
        nine.addEventListener('click',()=>{
            up.innerHTML += '9'
            this.resolution(up.innerHTML)

        })

        //botões de operação

        let division = create("button")
        division.innerHTML = "/"
        division.classList.add("buttons-op-calculator") 
        division.addEventListener('click',()=>{
            up.innerHTML += '/'
        })

        let multiplication = create("button")
        multiplication.innerHTML = "x"
        multiplication.classList.add("buttons-op-calculator") 
        multiplication.addEventListener('click',()=>{
            up.innerHTML += '*'
        })

        let sub = create("button")
        sub.innerHTML = "-"
        sub.classList.add("buttons-op-calculator") 
        sub.addEventListener('click',()=>{
            up.innerHTML += '-'
        })

        let plus = create("button")
        plus.innerHTML = "+"
        plus.classList.add("buttons-op-calculator") 
        plus.addEventListener('click',()=>{
            up.innerHTML += '+'
        })

        let ac = create("button")
        ac.innerHTML = "AC"
        ac.classList.add("buttons-op-calculator") 
        ac.addEventListener('click',()=>{
            up.innerHTML = ''
            down.innerHTML = ''
        })


        //Atribuição dos elementos
        buttons.appendChild(zero)
        buttons.appendChild(one)
        buttons.appendChild(two)
        buttons.appendChild(three)
        buttons.appendChild(four)
        buttons.appendChild(five)
        buttons.appendChild(six)
        buttons.appendChild(seven)
        buttons.appendChild(eight)
        buttons.appendChild(nine)

        buttons.appendChild(division)
        buttons.appendChild(multiplication)
        buttons.appendChild(plus)
        buttons.appendChild(sub)
        buttons.appendChild(ac)

        this.element.appendChild(buttons)

    }

    resolution(equation){
        let output = document.getElementById("down-display-calculator")
        const RETURN = eval(equation)
        output.innerText = RETURN
    }
    
}