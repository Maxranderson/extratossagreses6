class ZeroFill {
    constructor(){
        throw new Error('Essa classe não pode ser instanciada!');
    }

    static fill(valor, tamanho) {

        for(var i = valor.length; i < tamanho; i++){
		valor = '0' + valor;
	    }
        return valor;
    }
}
