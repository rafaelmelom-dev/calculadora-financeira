import express from "express";

import JurosCompostosController from '../controllers/compostos/JurosCompostosController.js';
import ProporcaoTaxaController from "../controllers/compostos/ProporcaoTaxaController.js";
import EquivalenciaTaxaController from "../controllers/compostos/EquivalenciaTaxaController.js";

const router = express.Router();

router.get('/', JurosCompostosController.renderForm);
router.post('/', JurosCompostosController.calcular);
router.post('/proporcao', ProporcaoTaxaController.calcular);
router.post('/equivalencia', EquivalenciaTaxaController.calcular);

export default router;