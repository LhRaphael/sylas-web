import { create, clear, separate, archives } from "./crutch.js"
import { File } from "./File.js"

export class Shell {
    constructor(id) {
                
        this.father = document.getElementById(id)

        this.element = create("div")
        this.element.id = "shell"

        // variáveis de apoio
        this.clear = 0 // atributo para indicar que o terminal esta limpo
        this.ip_number = '' // reservada para guardar o endereço ip publico
        this.comands_previous_list = [''] // reservada para armazenar os comandos inseridos

        this.comands = {
            cls: "cls    - clean the terminal",
            echo: "echo   - display a mensage on the screen",
            exit: "exit   - close the terminal",
            help: "help   - shows the comand list",
            ip: "ip     - shows the user's public ip",
            pwd: "pwd    - show the current path",
            search: "search - displays the result of a search",
            ls: "ls     - shows the files",
            efile: "efile  - open the terminal editor",
            cat: "cat    - shows the contents of a file",
            rm: "rm     - remove a file",
            rename: "rename - change the name of a file",
            savef: "savef  - save the file on the machine",
            open: "open   - open the app"
        }

        // funções carregadas na hora que o programa é iniciado
        this.focus()
        this.ip()
        
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
        // verifica se o elemento de entrada ja existe
        if(document.getElementById("input-area-shell") && this.clear === 1){
            document.getElementById("input-area-shell").remove()
            this.clear = 0
        }

        let input_area = create("div")
        input_area.id = "input-area-shell"
        
        let input_label = create("label")
        input_label.innerText = 'Sylas@user::'
        input_label.id = "label-shell"

        let input = create("input")
        input.type = 'text'
        input.id = 'input-shell'
        input.addEventListener('keydown',(event)=>{ 
            // ativa o input se a tecla "enter" for precionada
            switch (event.key) {
            case 'Enter':
                this.switch_f(input.value)
                break;
            
            case 'ArrowUp':
                this.previous()
                break;

            case 'ArrowDown':
                this.continue()
                break;
            
            default:
                break;
           }

            document.getElementById("input-shell").focus()
        })

        input_area.appendChild(input_label)
        input_area.appendChild(input)
        
        this.element.appendChild(input_area)
        this.focus()

    }

    //focar no input
    focus(){
        this.element.addEventListener('click',()=>{
            if(document.getElementById("input-shell")){
               document.getElementById("input-shell").focus()
            }
        })
    }

    previous(){
        let input = document.getElementById("input-shell")

        if(this.comands_previous_list.length > 1){
            input.value = this.comands_previous_list.pop()
        }

    }

    continue(){
        let input = document.getElementById("input-shell")
        input.value = ''
    }

    //switch de interface para as funções

    // tabelinha de comandos para gastar menos memoria criando um array com laços de repetição

    /* 
    echo: exibe um texto no terminal
    cls: limpa o terminal
    ip: mostra o ip público
    pwd: mostra o caminho atual
    exit: fecha o terminal
    help: exibe os comandos do terminal
    */
    switch_f(comand){
        let output = create("div")
        output.id = 'output-shell'

        if(comand !=''){
            this.comands_previous_list.push(comand)
        }

        console.log(this.comands_previous_list)

        let comand_line = separate(comand) // separa os elementos do valor do input em um array
        
        switch (comand_line[0]){ // verifica qual é o primeiro elemento do array
            
            case 'echo':
                output.innerHTML = this.echo(comand_line.slice(1)) // envia um array a partir do segundo elemento
                break;
            
            case 'cls':
                this.cls()
                break;
            
            case 'ip':
                output.innerHTML = this.ip_number
                break;

            case 'pwd':
                output.innerHTML = this.pwd()
                break;

            case 'exit':
                this.exit()
                break;
            
            case 'help':
                output.appendChild(this.help())
                break;

            case 'search':
                this.search(comand_line.slice(1)) // resolve a promise e exibe o resultado na tela
                .then(response => {
                    output.innerHTML = response
                })
                break;

            case 'ls':
                output.appendChild(this.ls())
                break;

            case 'efile':
                this.efile(comand_line.slice(1))
                break;

            case 'cat':
                output.appendChild(this.cat(comand_line.slice(1)))
                break;

            case 'rm':
                output.innerHTML = this.rm(comand_line.slice(1))
                break;

            case 'rename':
                output.innerHTML = this.rename(comand_line[1], comand_line[2])
                break;

            case 'savef':
                output.innerHTML = this.savef(comand_line.slice(1))
                break;

            case 'open':
                this.open(comand_line.slice(1))
                break;

            case '': // no caso de apertar apenas enter
                output.innerHTML = ''
                break;

            default:
                output.innerHTML = 'comand not found: '+ comand_line[0]
                break;
        }

        this.element.appendChild(output) // adiciona a saida de comando ao elemento pai
        document.getElementById("input-shell").remove() // remove o primeiro input mas deixa a label
        this.components()// adiciona um novo input
    }

    //comandos
    echo(array){ // recebe um array com comandos adicionais 

        let text_full = array.join(" ")
        
        return text_full
    }

    cls(){
        this.clear = 1 // indica que o terminal possui dados para serem limpos
        this.element.innerHTML = ''
        this.components()
    }

    ip(){
        fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            this.ip_number = "Ip public (IPv4):"+data.ip
        })
        .catch(error => console.error("Erro:", error));
    }

    pwd(){
        const path = window.location.pathname
        return path
    }

    exit(){
        this.cls()
        this.comands_previous_list = []
        this.search_output = ''
        this.element.style.display = 'none'
    }

    help(){
        let list = create("pre")
        let comand_list = ''

        for(let key in this.comands){
            comand_list += this.comands[key] + '\n'
        }

        list.innerHTML = comand_list
        return list
    }

    search(query){
        
        query = this.search_treatment(query)

        return fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages
            const pageId = Object.keys(pages)[0]
            return pages[pageId]?.extract || "abstract not available."
        })
        .catch(error => {
          console.error("Error:", error)
        });
    }

    ls(){

        let list = create("pre")
        list.id = 'files'
        let files = ''

        archives.forEach(archive => {
            files += archive.name + '\n'
        })

        list.innerHTML = files

        console.log(list)

        return list

    }

    efile(name){
        this.element.innerHTML = ''

        let editor = create("textarea")
        editor.id = "efile"

        let keys_list = create("ul")
        keys_list.id = 'key-list-efile'

        let save = create("li")
        save.innerHTML = "to save: ctrl+s"
        keys_list.appendChild(save)

        let exit = create("li")
        exit.innerHTML = "to exit: ctrl+x"
        keys_list.appendChild(exit)

        //configuração do arquivo em si
        let file = new File(name)

        //verifica se o arquivo já existe
        let present = archives.findIndex(archive =>
            JSON.stringify(archive.name) == JSON.stringify(file.name)
        )

        //o conteúdo do text area já começa com o conteudo do arquivo existente
        if(present !== -1){
            editor.value = archives[present].content
        }

        editor.addEventListener('keydown', (event)=>{
            if(event.key === 'Tab'){
                event.preventDefault()
                editor.value += "   "
            }

            else if(event.ctrlKey && event.key === 's'){

                event.preventDefault()
                file.content = editor.value

                let exist = archives.some(archive => archive.name == file.name)

                //executa caso o arquivo já exista
                console.log(present)
                if(present !== -1 || exist){
                    archives[present].content = file.content // muda o conteudo do arquivo para o novo conteudo
                }
                else{
                    archives.push(file) // adiciona um arquivo caso ele não exista
                }

                console.log(archives)
            }

            else if(event.ctrlKey && event.key === 'x'){
                event.preventDefault()
                editor.remove()
                keys_list.remove()
                this.components()
            }
        })

        this.element.appendChild(editor)
        this.element.appendChild(keys_list)
    }

    cat(file_name){
        let content = create("pre")

        let index = archives.findIndex(archive => 
            JSON.stringify(archive.name) == JSON.stringify(file_name)
        )

        if(index !== -1){
            content.innerHTML = archives[index].content
            return content
        }

        return "file not found"

    }

    rm(file){
        let index = archives.findIndex(archive =>
            JSON.stringify(archive.name) == JSON.stringify(file)
        )


        if(index !== -1){
            archives.splice(index, 1)
            return "file removed"
        }

        return "file not found"
    }

    //previous name and next name
    rename(pname/*nome antigo*/ , nname/*novo nome*/){
        console.log(pname)
        console.log(nname)

        let index = archives.findIndex(archive =>
            archive.name == pname
        )

        console.log(index)

        if(index !== -1){
            archives[index].name = nname
            return "name changed"
        }

        return "file not found"
    }

    savef(file){
        let index = archives.findIndex(archive =>
            JSON.stringify(archive.name) == JSON.stringify(file)
        )

        if(index !== -1){
            file = archives[index] // para facilitar as coisas

            const blob = new Blob([file.content], {type: 'text/plain'})

            const url = URL.createObjectURL(blob)
            const archive = document.createElement('a')
            archive.href = url
            archive.download = file.name
            document.body.appendChild(archive)
            archive.click()

            URL.revokeObjectURL(url)
            archive.remove()
            return ''
        }

        return "file not found"

    
    }

    open(id){
        let app = document.getElementById(id)

        if(app.style.display == "none"){
            this.exit()
            app.style.display = 'block'
        }

    }

    //funções de apoio
    search_treatment(query){

        let level_one = '' // ponto de inicio

        query.forEach(string => {
            level_one += string.charAt(0).toUpperCase() + string.slice(1) + '_' // coloca a primeira letra de cada palavra em caixa alta
        });

        let level_two = level_one.slice(0,-1) // remove o ultimo "_" 

        return level_two
        
    }

}