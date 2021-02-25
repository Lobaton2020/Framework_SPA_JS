import AbstractView from './AbstractView.js'

export default class extends  AbstractView{
    constructor(params){
        super(params)
        console.log(params)
        console.log(params.id)
        this.setTitle("Post")
    }

    handleClick(e){
        alert("Hola un evento")
    }

    async render(){
        return `
        <div class="jumbotron">
            <h1 class="display-3">Detalle del post de id ${this.params.id}!</h1>
      </div>
        `
    }
}
