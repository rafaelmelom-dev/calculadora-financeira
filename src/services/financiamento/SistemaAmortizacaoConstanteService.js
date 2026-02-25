import ResponseFactory from "../../utils/ResponseFactory.js";

function SistemaAmortizacaoConstanteService(financiamento, taxa, tempo, carencia) {
    // constante
    const amortizacao = financiamento / tempo;
    const amortizacaoList = new Array(tempo).fill(amortizacao);
    amortizacaoList.unshift(0);
    const juros = new Array();
    juros.push(0);
    const pmt = new Array();
    pmt.push(0);
    const saldoDevedor = new Array();
    saldoDevedor.push(financiamento);


    for (let i = 1; i <= tempo; i++) {
        juros.push(amortizacao * (tempo - i + 1) * taxa);
        pmt.push(amortizacao * (1 + (tempo - i + 1) * taxa));
        saldoDevedor.push(financiamento - amortizacao * i);
    }

    if (carencia) {
        let primeiroJuros = financiamento * taxa;
        for (let i = 0; i < carencia; i++) {
            juros.splice(1, 0, primeiroJuros);
            pmt.splice(1, 0, primeiroJuros);
            amortizacaoList.splice(1, 0, 0);
            saldoDevedor.splice(1, 0, financiamento);
        }
    }

    const sumArray = (arr) =>
        arr.reduce((total, current) => (total += current), 0);

    const jurosTotal = sumArray(juros);
    juros.push(jurosTotal);
    const amortizacaoTotal = financiamento;
    amortizacaoList.push(amortizacaoTotal);
    const pmtTotal = sumArray(pmt);
    pmt.push(pmtTotal);
    const saldoDevedorTotal = 0;
    saldoDevedor.push(saldoDevedorTotal);


    const result = {
        amortizacao: amortizacaoList,
        juros,
        pmt,
        saldoDevedor,
    };

    console.log(result)

    return ResponseFactory.createAmortizacaoResponse(
        { financiamento, taxa, tempo },
        result,
        "sac",
    );
}

export default SistemaAmortizacaoConstanteService;
