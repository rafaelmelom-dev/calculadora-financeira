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

export default { createJurosResponse, createJurosBadResponse};