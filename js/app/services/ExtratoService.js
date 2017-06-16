class ExtratoService {

    constructor() {

    }

    importarDoSagres(arquivos, listaAtual) {
        return new Promise((resolve, reject) => {
            let promisesArray = [];
            for(let i = 0; i < arquivos.length; i++){
                let arquivo = arquivos[0];
                promisesArray.push(this.importarArquivo(arquivo));
            }
            Promise.all(promisesArray).then(arrays => {
                let extratos = arrays.reduce((dados, array) =>
                                        dados.concat(array))
                                        .filter(negociacao =>
                                            !listaAtual.some(extratoExistente =>
                                            negociacao.isEquals(extratoExistente)));
                resolve(extratos);
            }).catch(e => {
                console.log(e);
                throw new Error('Contas não foram importadas!')
            });


        });

    }

    importarLista(arquivo) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onloadend = e => {
                let extratosArray = []
                let objectArray = JSON.parse(reader.result);
                objectArray.forEach(objeto => {
                     extratosArray.push(new Extrato(objeto._ug, objeto._agencia, objeto._conta, objeto._tipo, objeto._sub, objeto._descricao));
                });
                resolve(extratosArray);
            }

            reader.onerror = e => {
                reject(e);
            }

            reader.readAsText(arquivo);
        });
    }

    importarArquivo(arquivo){
        return new Promise((resolve, reject)=>{

            let reader = new FileReader();

            reader.onerror = e => {
                reject(e);
            };

            reader.onloadend = e => {
                var lines = reader.result.split('\n');

                var ugArray = [];
                var agenciaArray = [];
                var contaArray = [];
                let extratoArray = [];
                for(var line = 0; line < lines.length; line++){
                    if(lines[line] == ''){
                        break;
                    }
                    var lineArray = lines[line].split('');
                    if(lineArray[19] == "1"){
                        ugArray = lineArray.slice(0, 6);
                        agenciaArray = lineArray.slice(23, 29);
                        contaArray = lineArray.slice(6, 19);
                        var tipo = lineArray[89];
                        var ug = ugArray.join("");
                        var agencia = agenciaArray.join("");
                        var conta = contaArray.join("");
                        extratoArray.push(new Extrato(ug, agencia, conta, tipo));
                    }
                }
                resolve(extratoArray);
            }

            reader.readAsText(arquivo);

        });
    }

}
