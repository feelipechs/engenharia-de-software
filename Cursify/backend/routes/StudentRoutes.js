import { Router } from 'express';
import StudentController from '../controllers/StudentController.js'; // AlunoController -> StudentController

const router = Router();

// Rotas READ (Read Routes)
router.get('/', StudentController.findAllStudents); // GET /alunos (listarAlunos -> findAllStudents)
router.get('/:id', StudentController.findStudentById); // GET /alunos/:id (listarAlunoPorId -> findStudentById)
router.get('/:id/cursos', StudentController.findStudentCourses); // GET /alunos/:id/cursos (listarCursosDoAluno -> findStudentCourses)

// Rotas WRITE (Write Routes)
router.post('/', StudentController.createStudent); // POST /alunos (criarAluno -> createStudent)
router.put('/:id', StudentController.updateStudent); // PUT /alunos/:id (atualizarAluno -> updateStudent)
router.delete('/:id', StudentController.deleteStudent); // DELETE /alunos/:id (deletarAluno -> deleteStudent)

export default router;
