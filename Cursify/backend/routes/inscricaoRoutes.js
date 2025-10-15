import express from 'express';
import inscricaoController from '../controllers/inscricaoController.js';

const router = express.Router();

// POST /inscricoes - Inscreve um aluno em um curso
router.post('/', inscricaoController.realizarInscricao);

export default router;