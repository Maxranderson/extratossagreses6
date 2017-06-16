class Extrato {

    constructor(ug, agencia, conta, tipo, sub, descricao) {
        this._ug = ug;
        this._agencia = ZeroFill.fill(agencia, 6);
        this._conta = ZeroFill.fill(conta, 13);
        this._tipo = tipo;
        this._sub = sub || 0;
        this._descricao = this._sub==0?'Conta Principal':'';
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

    get descricao() {
        return this._descricao;
    }

    set descricao(descricao) {
        this._descricao = descricao;
    }

    nomeCompleto(mes, ano) {
        return `extrato${this._ug}${this.agencia}${this._conta}${this._tipo}${mes}${ano}${this._sub==0?'':this._sub}.pdf`;
    }

    isEquals(outroExtrato) {
        return JSON.stringify(this) == JSON.stringify(outroExtrato);
    }

}
