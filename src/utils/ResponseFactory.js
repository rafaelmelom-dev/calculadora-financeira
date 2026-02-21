const createJurosResponse = (reqData, result, formula, target, metodo) => {
    return {
        meta: {
            status: 'success',
            metodo: metodo
        },
        request: reqData,
        response: {
            result: result,
            formula: formula,
            target: target
        }
    }
}

const createJurosBadResponse = (code, message, help) => {
    return {
        meta: {
            status: 'error',
            code: code,
            message: message,
            help: help
        }
    }
}

const createAmortizacaoResponse = (reqData, result, target) => {
    return {
        meta: {
            status: 'success',
        },
        request: reqData,
        response: {
            result: result,
            target: target
        }
    }
}

const createAmortizacaoBadResponse = (code, message, help) => {
    return {
        meta: {
            status: "error",
            code: code,
            message: message,
            help: help
        }
    }
}

const createVplResponse = (reqData, result) => {
    return {
        meta: {
            status: 'success',
        },
        request: reqData,
        response: {
            result: result
        }
    }
}

const createVplBadResponse = (code, message, help) => {
    return {
        meta: {
            status: "error",
            code: code,
            message: message,
            help: help
        }
    }
}

export default { createVplResponse, createVplBadResponse, createAmortizacaoResponse, createAmortizacaoBadResponse, createJurosResponse, createJurosBadResponse };
