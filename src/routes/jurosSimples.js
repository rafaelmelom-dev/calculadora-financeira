import express from 'express';
import JurosSimplesController from '../controllers/simples/JurosSimplesController.js';
import EquivalenciaTaxaController from '../controllers/simples/EquivalenciaTaxaController.js';

const router = express.Router();


router.get('/', JurosSimplesController.renderForm);
router.post('/', JurosSimplesController.calcular);
router.post('/equivalencia', EquivalenciaTaxaController.calcular);

export default router;