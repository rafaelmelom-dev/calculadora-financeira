import JurosCompostosService from '../../services/compostos/JurosCompostosServices.js';
import { periods } from '../../../public/js/TimeReference.js';

const JurosCompostosController = {
    renderForm: (req, res) => {
        const theme = req.cookies.theme || 'light';

        res.render('juros/compostos/index', {dados: null, theme, periods});
    }, 

    calcular: (req, res) => {
        let {montante, capital, juros, taxa, tempo, target, tempoFreq, taxaFreq} = req.body;

        montante = parseFloat(montante);
        capital = parseFloat(capital);
        juros = parseFloat(juros);
        taxa = parseFloat(taxa);
        tempo = parseFloat(tempo);

        if (!target) {
            res.render('juros/compostos/resultadoJuros', {dados: null});
        }

        try {
            let dados = null;

            switch (target) {
                case 'capital':
                    dados = JurosCompostosService.calcularCapital(montante, juros, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'montante':
                    dados = JurosCompostosService.calcularMontante(capital, juros, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'juros':
                    dados = JurosCompostosService.calcularJuros(montante, capital, taxa, tempo, taxaFreq, tempoFreq);
                    break;
                case 'taxa': 
                    dados = JurosCompostosService.calcularTaxa(montante, capital, juros, tempo, tempoFreq);
                    break;
                case 'tempo':
                    dados = JurosCompostosService.calcularTempo(montante, capital, juros, taxa, taxaFreq);
                    break;
                default:
                    break;
            }

            res.render('juros/compostos/resultadoJuros', {dados});
        } catch (err) {
            console.log(err);
            res.render('juros/compostos/resultadoJuros', {dados: null});
        }
    }
}

export default JurosCompostosController;
