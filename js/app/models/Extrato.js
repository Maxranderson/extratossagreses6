class Extrato {

    constructor(ug, agencia, conta, tipo, sub) {
        this._ug = ug;
        this._agencia = ZeroFill.fill(agencia, 6);
        this._conta = ZeroFill.fill(conta, 13);
        this._tipo = tipo;
        this._sub = sub || 0;
    }

    get ug() {
        return this._ug;
    }

    get agencia() {
        return this._agencia;
    }

    get conta() {
        return this._conta;
    }

    get tipo() {
        return this._tipo;
    }

    get sub() {
        return this._sub;
    }

    nomeCompleto(mes, ano) {
        return `extrato${this._ug}${this.agencia}${this._conta}${this._tipo}${mes}${ano}.pdf`;
    }

}
