class ExtratoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._extratoForm = $('#extratoForm');

        this._tabelaExtratos = new Bind(new ListaExtratos(),
                                new TabelaExtratosView($('#tabelaExtratosView')),
                                'adiciona', 'adicionaSubExtrato','remove', 'limpa', 'atualiza');

        this._listaExtratos = new Bind(new ListaExtratos(),
                                new ListaExtratosView($('#listaExtratosView')),
                                'adiciona', 'remove', 'limpa');

        this.arquivosSagres = $('#importarArquivosSagresInput');
        this.arquivoLista = $('#importarListaInput');

        this._mesInput = $('#mes');
        this._anoInput = $('#ano');

        this._service = new ExtratoService();
    }

    adiciona(event) {
        event.preventDefault();
        if(this._validaExtratoForm()){
            this._tabelaExtratos.adiciona(this._criaExtrato());
        }

    }

    confirmaSubExtratoDescricao(indice, event) {
        let descricao;
        if(event.target.tagName != 'button'){
            descricao = event.target.parentNode.parentNode.querySelector('input').value;
        }else{
            descricao = event.target.parentNode.querySelector('input').value;
        }
        let item = this._tabelaExtratos.pegarItem(indice);
        item.descricao = descricao;
        this._tabelaExtratos.atualiza();
    }

    remove(indice) {
        this._tabelaExtratos.remove(indice);
    }

    limpaTabela() {
        this._tabelaExtratos.limpa();
    }

    adicionaSubExtrato(indice) {
        let extratoPrincipal = this._tabelaExtratos.pegarItem(indice);
        let quantidade = this._tabelaExtratos.quantidadeDeSubExtratos(extratoPrincipal);
        let subExtrato = new Extrato(extratoPrincipal.ug,
                                        extratoPrincipal.agencia,
                                        extratoPrincipal.conta,
                                        extratoPrincipal.tipo,
                                        quantidade+1);
        this._tabelaExtratos.adicionaSubExtrato(subExtrato ,indice+quantidade+1);
    }

    gerarLista() {
        this._listaExtratos.limpa();
        this._tabelaExtratos.extratos.forEach(extrato =>
                                        this._listaExtratos.adiciona(extrato));
        appController.change('Renomear-lista');
    }

    renomearLista() {
        let arquivosInputs = document.querySelectorAll('.arquivosExtratos');
        let arquivosValidados = true;

        for(let i = 0; i < arquivosInputs.length; i++){
            let tr = arquivosInputs[i].parentNode.parentNode;
            if(arquivosInputs[i].files[0]){
                tr.classList.remove('danger');
                tr.classList.add('success');
            }else{
                tr.classList.add('danger');
                arquivosValidados = false;
            }
        }

        if(arquivosValidados){
            for(let i = 0; i < arquivosInputs.length; i++){
                let arquivo = arquivosInputs[i].files[0];
                console.log(arquivo);
                let extrato = this._listaExtratos.pegarItem(i);
                let url = URL.createObjectURL(arquivo);
                let a = document.createElement("a");
                a.style = "display: none";
                document.body.appendChild(a);
                a.href = url;
                a.download = extrato.nomeCompleto(this._mesInput.value, this._anoInput.value);
                a.click();
                window.URL.revokeObjectURL(arquivo);
                document.body.removeChild(a);
            }
        }

    }

    importarDoSagres() {

        let arquivos = this.arquivosSagres.files;
        this._service.importarDoSagres(arquivos, this._tabelaExtratos.extratos)
                        .then(extratos => extratos
                                .forEach( extrato =>
                                    this._tabelaExtratos.adiciona(extrato)))
                        .catch(/*implementar a mensagem*/);
    }

    importarLista() {
        let arquivo = this.arquivoLista.files[0];
        this._service.importarLista(arquivo)
                        .then(extratos => {
                            this._listaExtratos.limpa();
                            extratos.forEach(extrato =>
                                        this._listaExtratos.adiciona(extrato))
                        })
                        .catch(/*Implementar mensagem de erro*/);
    }

    exportarLista() {
        let array = [];
        let dados = JSON.stringify(this._listaExtratos.extratos);
        array.push(dados);
        let blob = new Blob(array, {type: 'text/text'});
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.style = "display: none";
        document.body.appendChild(a);
        a.href = url;
        a.download = "extratosLista.txt";
        a.click();
        window.URL.revokeObjectURL(blob);
        document.body.removeChild(a);
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

    inserirNaLista(extrato) {
        this._tabelaExtratos.adiciona(extrato);
    }
}
