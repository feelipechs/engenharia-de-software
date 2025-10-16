import { Router } from 'express';
import AlunoController from '../controllers/alunoController.js';

const router = Router();

// Rotas READ
router.get('/', AlunoController.listarAlunos); // GET /alunos
router.get('/:id', AlunoController.listarAlunoPorId); // GET /alunos/:id
router.get('/:id/cursos', AlunoController.listarCursosDoAluno); // GET /alunos/:id/cursos

// Rotas WRITE
router.post('/', AlunoController.criarAluno); // POST /alunos
router.put('/:id', AlunoController.atualizarAluno); // PUT /alunos/:id
router.delete('/:id', AlunoController.deletarAluno); // DELETE /alunos/:id

export default router;
