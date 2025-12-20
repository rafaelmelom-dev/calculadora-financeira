import ResponseFactory from '../../utils/ResponseFactory.js';
import ConverterService from './ConverterService.js';

const EquivalenciaTaxaService = {
    calcularTaxaEfetiva: (tempo, taxaDescontoComercial) => {
        const target = 'taxa-efetiva';
        const metodo = 'simples';

        taxaDescontoComercial /= 100;

        if (tempo && taxaDescontoComercial) {
            const resultado = taxaDescontoComercial / (1 - taxaDescontoComercial * tempo);
            const formula = "\\( i = \\frac{i_c}{1 - i_c \\times n} \\)";
            return ResponseFactory.createJurosResponse({ tempo, taxaDescontoComercial }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    }, 
    calcularTaxaDescontoComercial: (tempo, taxaEfetiva) => {
        const target = 'taxa-desconto-comercial';
        const metodo = 'simples';

        taxaEfetiva /= 100;

        if (tempo && taxaEfetiva) {
            const resultado = taxaEfetiva / (1 + taxaEfetiva * tempo);
            const formula = "\\( i_c = \\frac{i}{1 + i \\times n} \\)";
            return ResponseFactory.createJurosResponse({ tempo, taxaEfetiva }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    }
}

export default EquivalenciaTaxaService;