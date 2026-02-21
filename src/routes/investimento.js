import express from "express";

// exemplo, tenho que alterar os pacotes

import InvestimentoController from "../controllers/financiamento/InvestimentoController.js";

const router = express.Router();

router.get("/", InvestimentoController.renderForm);
router.post("/amortizacao", InvestimentoController.calcularAmortizacao)
router.post("/vpl", InvestimentoController.calcularVPL);

// router.get("/", JurosCompostosController.renderForm);
// router.post("/", JurosCompostosController.calcular);
// router.post("/proporcao", ProporcaoTaxaController.calcular);
// router.post("/equivalencia", EquivalenciaTaxaController.calcular);

export default router;
