class ListaExtratos {
    constructor() {
        this._extratos = [];
    }

    get extratos() {
        return [].concat(this._extratos);
    }

    adiciona(extrato) {
        this._extratos.push(extrato);
    }

    adicionaSubExtrato(subExtrato, posicao) {
        this._extratos.splice(posicao, 0, subExtrato);
    }

    limpa() {
        this._extratos = [];
    }

    atualiza(){

    }

    remove(indice) {
        this._extratos.splice(indice, 1);
    }

    pegarItem(indice) {
        return this._extratos[indice];
    }

    quantidadeDeSubExtratos(extratoPrincipal){
        let quantidade = 0;
        this._extratos.forEach(extrato => {
            if(extratoPrincipal.ug == extrato.ug &&
                extratoPrincipal.agencia == extrato.agencia &&
                extratoPrincipal.conta == extrato.conta &&
                extratoPrincipal.tipo == extrato.tipo){
                    if(extrato.sub != 0){
                        quantidade++;
                    }
            }
        });
        return quantidade;
    }
}
