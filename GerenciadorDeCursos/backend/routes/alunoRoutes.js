import express from 'express';
import alunoController from '../controllers/alunoController.js';

const router = express.Router(); // criar instância do router

// GET /alunos - Lista todos os alunos.
router.get('/', alunoController.listarAlunos); // associa um método HTTP e um caminho a um método específico do alunoController

// POST /alunos - Cadastra um novo aluno.
router.post('/', alunoController.criarAluno);

// GET /alunos/:id/cursos - Lista todos os cursos em que um aluno está inscrito
router.get('/:id/cursos', alunoController.listarCursosDoAluno);

export default router;