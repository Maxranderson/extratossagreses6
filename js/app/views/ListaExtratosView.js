class ListaExtratosView extends View {

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
                    <th>Arquivo</th>
                </thead>
                <tbody>
                    ${model.extratos.map((ext) => `
                        <tr>
                            <td>${ext.ug}</td>
                            <td>${ext.agencia}</td>
                            <td>${ext.conta}</td>
                            <td>${ext.tipo}</td>
                            <td>${ext.descricao}</td>
                            <td colspan="2"><input class="arquivosExtratos" type="file" name="arquivo"></td>
                        </tr>
                        `).join('')}
                </tbody>
                <tfoot>
                    <th>UG</th>
                    <th>Agência</th>
                    <th>Conta</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Arquivo</th>
                </tfoot>
            </table>
        `;
    }
}
