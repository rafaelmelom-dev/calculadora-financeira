import ResponseFactory from '../../utils/ResponseFactory.js';
import ConverterService from './ConverterService.js';

const ProporcaoTaxaService = {
    calcularTaxaEfetiva: (tempo, taxaNominal) => {
        const target = 'taxa-efetiva';
        const metodo = 'composto';

        if (tempo && taxaNominal) {
            const resultado = taxaNominal / tempo;
            const formula = "\\( i = \\frac{i_k}{k} \\)"
            return ResponseFactory.createJurosResponse({ tempo, taxaNominal }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    },
    calcularTaxaNominal: (tempo, taxaEfetiva) => {
        const target = 'taxa-nominal';
        const metodo = 'composto';

        if (tempo && taxaEfetiva) {
            const resultado = taxaEfetiva * tempo;
            const formula = "\\( i_k = i \\times k \\)";
            return ResponseFactory.createJurosResponse({ tempo, taxaEfetiva }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    }
}

export default ProporcaoTaxaService;