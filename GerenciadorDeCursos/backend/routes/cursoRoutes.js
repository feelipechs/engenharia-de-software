import express from 'express';
import cursoController from '../controllers/cursoController.js';

const router = express.Router();

// GET /cursos - Lista todos os cursos.
router.get('/', cursoController.listarCursos);

// POST /cursos - Cadastra um novo curso.
router.post('/', cursoController.criarCurso);

// GET /cursos/:id/alunos - Lista todos os alunos inscritos em um curso
router.get('/:id/alunos', cursoController.listarAlunosDoCurso)

export default router;