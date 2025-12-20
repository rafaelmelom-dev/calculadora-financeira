import EquivalenciaTaxaService from "../../services/simples/EquivalenciaTaxaService.js";

const EquivalenciaTaxaController = {
    calcular: (req, res) => {
        const { tempo, taxaEfetiva, taxaDescontoComercial } = req.body;

        try {
            let dados = null;

            if (tempo) {
                if (taxaDescontoComercial) {
                    dados = EquivalenciaTaxaService.calcularTaxaEfetiva(tempo, taxaDescontoComercial);
                } else if (taxaEfetiva) {
                    dados = EquivalenciaTaxaService.calcularTaxaDescontoComercial(tempo, taxaEfetiva);
                }
            }

            res.render('juros/simples/resultadoEquivalencia', { dados });

        } catch (err) {
            console.log(err);
            res.render('juros/simpes/resultadoEquivalencia', { dados: null });
        }
    }
}

export default EquivalenciaTaxaController;
