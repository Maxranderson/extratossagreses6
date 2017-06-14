class ExtratoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._extratoForm = $('#extratoForm');

        this._tabelaExtratos = new Bind(new ListaExtratos(),
                                new TabelaExtratosView($('#tabelaExtratosView')),
                                'adiciona', 'remove');

        this._arquivosSagres = $('importarArquivosSagresInput');
        this.service = new ExtratoService();
        console.log(this._extratoForm);
    }

    adiciona(event) {
        event.preventDefault();
        if(this._validaExtratoForm()){
            this._tabelaExtratos.adiciona(this._criaExtrato());
            console.log(this._tabelaExtratos.extratos);
        }

    }

    remove(indice) {
        this._tabelaExtratos.remove(indice);
        console.log(this._tabelaExtratos);
    }

    importarDoSagres() {
        let arquivos = this._arquivosSagres.files;
    }

    _criaExtrato() {
        return new Extrato(this._extratoForm.ug.value,
                            this._extratoForm.agencia.value,
                            this._extratoForm.conta.value,
                            this._extratoForm.tipo.value);
    }

    _validaExtratoForm() {
        let validado = true;
        if(this._extratoForm.ug.value.length != 6){
            validado = false;
        }
        return validado;
    }
}
