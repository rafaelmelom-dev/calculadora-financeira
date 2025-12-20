import ResponseFactory from '../../utils/ResponseFactory.js';
import ConverterService from './ConverterService.js';

const EquivalenciaTaxaService = {
    calcularTaxaEquivalente: (from, to, taxa) => {
        const target = 'taxa-equivalente';
        const metodo = 'composto';

        taxa /= 100;

        if (from && to && taxa) {
            const resultado = ConverterService.converterTaxa(taxa, from, to);
            const formula = "\\( i = (1 + i)^\\frac{de}{para} \\)"
            return ResponseFactory.createJurosResponse({from, to, taxa}, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    }
}

export default EquivalenciaTaxaService;