import ResponseFactory from '../../utils/ResponseFactory.js';
import ConverterService from './ConverterService.js';
import { fraction, format } from 'mathjs';

const JurosSimplesService = {
    calcularCapital: (montante, juros, taxa, tempo, taxaFreq, tempoFreq) => {
        const target = 'capital';
        const metodo = 'simples';

        taxa /= 100;

        if (taxaFreq != tempoFreq) {
            taxa = ConverterService.converterTaxa(taxa, taxaFreq, tempoFreq);
        }

        if (montante && juros) {
            const resultado = montante - juros;
            const formula = "\\( C = M - J \\)";
            return ResponseFactory.createJurosResponse({ montante, juros }, resultado, formula, target, metodo);
        } else if (!tempo || !taxa) {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        } else if (montante) {
            const resultado = montante / (1 + taxa * tempo);
            const formula = "\\( C = \\frac{M}{1 + i \\times n} \\)";
            return ResponseFactory.createJurosResponse({ montante, taxa, tempo }, resultado, formula, target, metodo);
        } else if (juros) {
            const resultado = juros / (taxa * tempo);
            const formula = "\\( C = \\frac{J}{i \\times n} \\)";
            return ResponseFactory.createJurosResponse({ juros, taxa, tempo }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    },
    calcularMontante: (capital, juros, taxa, tempo, taxaFreq, tempoFreq) => {
        const target = 'montante';
        const metodo = 'simples';

        taxa /= 100;

        if (taxaFreq != tempoFreq) {
            taxa = ConverterService.converterTaxa(taxa, taxaFreq, tempoFreq);
        } 

        if (!capital) {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        } else if (juros) {
            const resultado = capital + juros;
            const formula = "\\( M = C + J \\)";
            return ResponseFactory.createJurosResponse({ capital, juros }, resultado, formula, target, metodo);
        } else if (taxa && tempo) {
            const resultado = capital * (1 + taxa * tempo);
            const formula = "\\( M = C \\times \( 1 + i \\times n \) \\)";
            return ResponseFactory.createJurosResponse({ capital, taxa, tempo }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    },
    calcularJuros: (montante, capital, taxa, tempo, taxaFreq, tempoFreq) => {
        const target = 'juros';
        const metodo = 'simples';

        taxa /= 100;

        if (taxaFreq != tempoFreq) {
            taxa = ConverterService.converterTaxa(taxa, taxaFreq, tempoFreq);
        }

        if (!capital) {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        } else if (montante) {
            const resultado = montante - capital;
            const formula = "\\( J = M - C \\)";
            return ResponseFactory.createJurosResponse({ montante, capital }, resultado, formula, target, metodo);
        } else if (taxa && tempo) {
            const resultado = capital * taxa * tempo;
            const formula = "\\( J = C \\times i \\times n \\)";
            return ResponseFactory.createJurosResponse({ capital, taxa, tempo }, resultado, formula, target, metodo);
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    },
    calcularTaxa: (montante, capital, juros, tempo, tempoFreq) => {
        const target = 'taxa';
        const metodo = 'simples';

        if (!capital || !tempo) {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        } else if (juros) {
            const resultado = juros / (capital * tempo);
            const formula = "\\( i = \\frac{J}{C \\times n} \\)";
            const response = ResponseFactory.createJurosResponse({ juros, capital, tempo }, resultado, formula, target, metodo);
            response.response.period = tempoFreq;
            return response;
        } else if (montante) {
            const resultado = (montante / capital - 1) / tempo;
            const formula = "\\( i = \\frac{\\frac{M}{C} - 1}{n} \\)";
            const response = ResponseFactory.createJurosResponse({ montante, capital, tempo }, resultado, formula, target, metodo);
            response.response.period = tempoFreq;
            return response;
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    },
    calcularTempo: (montante, capital, juros, taxa, taxaFreq) => {
        const target = 'tempo';
        const metodo = 'simples'

        taxa /= 100;

        if (!capital || !taxa) {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        } else if (juros) {
            const resultado = (juros / (capital * taxa)).toFixed(2);
            const formula = "\\( n = \\frac{J}{C \\times i} \\)";
            const response = ResponseFactory.createJurosResponse({ juros, capital, taxa }, resultado, formula, target, metodo);
            response.response.period = taxaFreq;
            return response;
        } else if (montante) {
            const resultado = ((montante / capital - 1) / taxa).toFixed(2);
            const formula = "\\( n = \\frac{\\frac{M}{C} - 1}{i} \\)";
            const response = ResponseFactory.createJurosResponse({ montante, capital, taxa }, resultado, formula, target, metodo);
            response.response.period = taxaFreq;
            return response;
        } else {
            return ResponseFactory.createJurosBadResponse('INVALID_INPUT', 'Valores insuficientes!', 'Verifique os campos e os preencha com mais valores!');
        }
    }
}

export default JurosSimplesService;
