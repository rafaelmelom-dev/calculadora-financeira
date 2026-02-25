import ResponseFactory from "../../utils/ResponseFactory.js";

function SistemaAmortizacaoAmericanoService(financiamento, taxa, tempo, carencia) {
    // constante
    const juros = financiamento * taxa;
    const jurosList = new Array(tempo).fill(juros);
    jurosList.unshift(0);

    const pmt = new Array(tempo - 1).fill(juros);
    pmt.push(juros + financiamento);
    pmt.unshift(0);

    const amortizacao = new Array(tempo - 1).fill(0);
    amortizacao.push(financiamento);
    amortizacao.unshift(0);

    const saldoDevedor = new Array(tempo - 1).fill(financiamento);
    saldoDevedor.push(0);
    saldoDevedor.unshift(financiamento);

    if (carencia) {
        let primeiroJuros = financiamento * taxa;
        for (let i = 0; i < carencia; i++) {
            jurosList.splice(1, 0, primeiroJuros);
            pmt.splice(1, 0, primeiroJuros);
            amortizacao.splice(1, 0, 0);
            saldoDevedor.splice(1, 0, financiamento);
        }
    }

    const sumArray = (arr) =>
        arr.reduce((total, current) => (total += current), 0);

    const jurosTotal = sumArray(jurosList);
    jurosList.push(jurosTotal);
    const amortizacaoTotal = financiamento;
    amortizacao.push(amortizacaoTotal);
    const pmtTotal = sumArray(pmt);
    pmt.push(pmtTotal);
    const saldoDevedorTotal = 0;
    saldoDevedor.push(saldoDevedorTotal);

    const result = {
        amortizacao,
        juros: jurosList,
        pmt,
        saldoDevedor,
    };

    return ResponseFactory.createAmortizacaoResponse(
        { financiamento, taxa, tempo },
        result,
        "saa",
    );
}

export default SistemaAmortizacaoAmericanoService;
