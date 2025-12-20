import ProporcaoTaxaService from "../../services/compostos/ProporcaoTaxaService.js";

const ProporcaoTaxaController = {
    calcular: (req, res) => {
        const { tempo, taxaEfetiva, taxaNominal } = req.body;

        try {
            let dados = null;

            if (tempo) {
                if (taxaEfetiva) {
                    dados = ProporcaoTaxaService.calcularTaxaNominal(tempo, taxaEfetiva);
                } else if (taxaNominal) {
                    dados = ProporcaoTaxaService.calcularTaxaEfetiva(tempo, taxaNominal);
                }
            }

            res.render('juros/compostos/resultadoProporcao', { dados });

        } catch (err) {
            console.log(err);
            res.render('juros/compostos/resultadoProporcao', { dados: null });
        }
    }
}

export default ProporcaoTaxaController;

