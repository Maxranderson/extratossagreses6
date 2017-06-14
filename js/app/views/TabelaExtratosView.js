class TabelaExtratosView extends View {

    constructor(elemento){
        super(elemento);
    }

    template(model) {
        return `
            <table class="table table-striped">
                <thead>
                    <th>UG</th>
                    <th>Agência</th>
                    <th>Conta</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    ${model.extratos.map((ext, indice) => `
                        <tr>
                            <td>${ext.ug}</td>
                            <td>${ext.agencia}</td>
                            <td>${ext.conta}</td>
                            <td>${ext.tipo}</td>
                            <td>${!ext.tipo==0?"Conta Principal":""}</td>
                            <td colspan="2">
                                <button class="btn btn-danger" onclick="extratoController.remove(${indice})">
                                    <span class="glyphicon glyphicon-trash">
                                </button>
                            </td>
                        </tr>
                        `).join('')}
                </tbody>
                <tfoot>
                    <th>UG</th>
                    <th>Agência</th>
                    <th>Conta</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tfoot>
            </table>
        `;
    }
}
