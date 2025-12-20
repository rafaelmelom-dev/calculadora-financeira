import express from 'express';
import routerJurosSimples from './jurosSimples.js';
import routerJurosCompostos from './jurosCompostos.js';

const router = express.Router();

router.use('/simples', routerJurosSimples);
router.use('/compostos', routerJurosCompostos);

export default router;