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

    remove(indice) {
        this._extratos.splice(indice, 1);
    }
}
