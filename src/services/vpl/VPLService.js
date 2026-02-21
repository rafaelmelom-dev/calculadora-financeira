import ResponseFactory from "../../utils/ResponseFactory.js";

function VPLService(investimento, taxaVpl, valorResidual, tempoValorResidual, fluxo) {
    if (!investimento) {
        return ResponseFactory.createVplBadResponse("MISSING_FIELDS", "Faltam alguns campos", "Tente digitar pelo menos o investimento");
    } 

    let vpl = -investimento;

    if (tempoValorResidual && valorResidual) {
        vpl += (valorResidual / Math.pow(1 + taxaVpl, tempoValorResidual))
    }

    if (fluxo) {
        fluxo.forEach((element, index) => {
            element = parseFloat(element);
            if (!element) throw new Error("Missing values");
            vpl += (element / Math.pow(1 + taxaVpl, index + 1));
        })
    }

    return ResponseFactory.createVplResponse({investimento, taxaVpl, valorResidual, tempoValorResidual}, vpl);
}

export default VPLService;
