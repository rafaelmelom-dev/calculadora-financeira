import ResponseFactory from "../../utils/ResponseFactory.js";

function SistemaAmortizacaoFrancesService(financiamento, taxa, tempo) {
  const fpv = (i, n) => (1 - Math.pow(1 + i, -n)) / i;

  // constante
  const pmt = financiamento * (1 / fpv(taxa, tempo));
  const pmtList = new Array(tempo).fill(pmt);
  pmtList.unshift(0);

  const primeiraAmortizacao = pmt - financiamento * taxa;
  const amortizacao = new Array();
  amortizacao.push(0);
  const juros = new Array();
  juros.push(0);
  const saldoDevedor = new Array();
  saldoDevedor.push(financiamento);

  for (let i = 1; i <= tempo; i++) {
    juros.push(saldoDevedor[i - 1] * taxa);
    amortizacao.push(pmt - juros[i]);
    saldoDevedor.push(saldoDevedor[i - 1] - amortizacao[i]);
  }

  const sumArray = (arr) =>
    arr.reduce((total, current) => (total += current), 0);

  const jurosTotal = sumArray(juros);
  juros.push(jurosTotal);
  const amortizacaoTotal = financiamento;
  amortizacao.push(amortizacaoTotal);
  const pmtTotal = sumArray(pmtList);
  pmtList.push(pmtTotal);
  const saldoDevedorTotal = 0;
  saldoDevedor.push(saldoDevedorTotal);

  const result = {
    amortizacao,
    juros,
    pmt: pmtList,
    saldoDevedor,
  };

  return ResponseFactory.createAmortizacaoResponse(
    { financiamento, taxa, tempo },
    result,
    "saf",
  );
}

export default SistemaAmortizacaoFrancesService;
