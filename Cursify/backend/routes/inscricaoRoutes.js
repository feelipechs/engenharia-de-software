import { Router } from 'express';
import InscricaoController from '../controllers/inscricaoController.js';

const router = Router();

// Rotas READ
router.get('/', InscricaoController.listarInscricoes); // GET /inscricoes
router.get('/:id', InscricaoController.listarInscricaoPorId); // GET /inscricoes

// Rotas WRITE/DELETE
router.post('/', InscricaoController.realizarInscricao); // POST /inscricoes
router.delete('/:id', InscricaoController.deletarInscricao); // DELETE /inscricoes/:id

export default router;
