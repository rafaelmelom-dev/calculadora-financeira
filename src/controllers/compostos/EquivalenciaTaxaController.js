import EquivalenciaTaxaService from "../../services/compostos/EquivalenciaTaxaService.js";

const EquivalenciaTaxaController = {
    calcular: (req, res) => {
        const { from, to, taxaEfetiva } = req.body;

        try {
            let dados = null;

            if (taxaEfetiva && from && to) {
                dados = EquivalenciaTaxaService.calcularTaxaEquivalente(from, to, taxaEfetiva);
            }

            res.render('juros/compostos/resultadoEquivalencia', { dados });

        } catch (err) {
            console.log(err);
            res.render('juros/compostos/resultadoEquivalencia', { dados: null });
        }
    }
}

export default EquivalenciaTaxaController;

