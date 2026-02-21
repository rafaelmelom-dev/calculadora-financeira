import { periods } from "../../../public/js/TimeReference.js";
import SistemaAmortizacaoConstanteService from "../../services/financiamento/SistemaAmortizacaoConstanteService.js";
import SistemaAmortizacaoFrancesService from "../../services/financiamento/SistemaAmortizacaoFrancesService.js";
import SistemaAmortizacaoAmericanoService from "../../services/financiamento/SistemaAmortizacaoAmericanoService.js";
import ConverterService from "../../services/compostos/ConverterService.js";
import VPLService from "../../services/vpl/VPLService.js";

const InvestimentoController = {
    renderForm: (req, res) => {
        const theme = req.cookies.theme || "light";

        res.render("investimento/index", { dados: null, theme, periods });
    },
    calcularAmortizacao: (req, res) => {
        let { financiamento, taxa, tempo, target, tempoFreq, taxaFreq } = req.body;

        financiamento = parseFloat(financiamento);
        taxa = parseFloat(taxa);
        tempo = parseFloat(tempo);

        taxa /= 100;

        if (taxaFreq != tempoFreq) {
            taxa = ConverterService.converterTaxa(taxa, taxaFreq, tempoFreq);
        }

        if (!target) {
            res.render("investimento/resultadoAmortizacao", { dados: null });
        }

        try {
            let dados = null;

            switch (target) {
                case "sac":
                    dados = SistemaAmortizacaoConstanteService(
                        financiamento,
                        taxa,
                        tempo,
                    );
                    break;
                case "saf":
                    dados = SistemaAmortizacaoFrancesService(financiamento, taxa, tempo);
                    break;
                case "saa":
                    dados = SistemaAmortizacaoAmericanoService(
                        financiamento,
                        taxa,
                        tempo,
                    );
                    break;
                default:
                    break;
            }

            res.render("investimento/resultadoAmortizacao", { dados });
        } catch (err) {
            console.log(err);
            res.render("investimento/resultadoAmortizacao", { dados: null });
        }
    },
    calcularVPL: (req, res) => {
        let { investimento, taxaVpl, tempoVpl, tempoVplFreq, taxaVplFreq, valorResidual, tempoValorResidual, fluxo } = req.body;

        investimento = parseFloat(investimento);
        taxaVpl = parseFloat(taxaVpl);
        tempoVpl = parseFloat(tempoVpl);
        valorResidual = parseFloat(valorResidual);
        tempoValorResidual = parseFloat(tempoValorResidual);

        taxaVpl /= 100;

        if (taxaVplFreq != tempoVplFreq) {
            taxaVpl = ConverterService.converterTaxa(taxaVpl, taxaVplFreq, tempoVplFreq);
        }

        let dados;
        try {
            dados = VPLService(investimento, taxaVpl, valorResidual, tempoValorResidual, fluxo)
        }
        catch (err) {
            dados = null;
            console.log(err)
        }
        console.log(dados);
        res.render('investimento/resultadoVPL', { dados });
    },
};

export default InvestimentoController;
