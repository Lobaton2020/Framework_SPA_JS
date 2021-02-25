import AbstractView from './AbstractView.js'

export default class extends  AbstractView{
    constructor(params){
        super(params)
        this.setTitle("Settings")
    }

    async render(){
        return `
        <div class="jumbotron">
            <h1 class="display-3">Estas son las configuraciones!</h1>
            <p class="lead">Texto simple del post.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
                <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
      </div>
        `
    }
}
