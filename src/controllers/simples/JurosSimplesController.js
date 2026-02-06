import JurosSimplesService from "../../services/simples/JurosSimplesService.js";

const JurosSimplesController = {
    renderForm: (req, res) => {
        const theme = req.cookies.theme || 'light';

        res.render('juros/simples/index', {dados: null, theme});
    }, 

    calcular: (req, res) => {
        let {montante, capital, juros, taxa, tempo, target, tempoFreq, taxaFreq} = req.body;

        montante = parseFloat(montante);
        capital = parseFloat(capital);
        juros = parseFloat(juros);
        taxa = parseFloat(taxa);
        tempo = parseFloat(tempo);

        if (!target) {
            res.render('juros/simples/resultadoJuros', {dados: null});
        }

        try {
            let dados = null;

            switch (target) {
                case 'capital':
                    dados = JurosSimplesService.calcularCapital(montante, juros, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'montante':
                    dados = JurosSimplesService.calcularMontante(capital, juros, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'juros':
                    dados = JurosSimplesService.calcularJuros(montante, capital, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'taxa': 
                    dados = JurosSimplesService.calcularTaxa(montante, capital, juros, tempo, tempoFreq);
                    break;
                case 'tempo':
                    dados = JurosSimplesService.calcularTempo(montante, capital, juros, taxa, taxaFreq);
                    break;
                default:
                    break;
            }

            res.render('juros/simples/resultadoJuros', {dados});
        } catch (err) {
            console.log(err);
            res.render('juros/simples/resultadoJuros', {dados: null});
        }
    }
}

export default JurosSimplesController;
