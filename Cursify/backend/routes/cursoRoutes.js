import { Router } from 'express';
import cursoController from '../controllers/cursoController.js';

const router = Router();

// Rotas READ
router.get('/', cursoController.listarCursos); // GET /cursos
router.get('/:id', cursoController.listarCursoPorId); // GET /cursos/:id
router.get('/:id/alunos', cursoController.listarAlunosDoCurso); // GET /cursos/:id/alunos

// Rotas WRITE
router.post('/', cursoController.criarCurso); // POST /cursos
router.put('/:id', cursoController.atualizarCurso); // PUT /cursos/:id
router.delete('/:id', cursoController.deletarCurso); // DELETE /cursos/:id

export default router;
