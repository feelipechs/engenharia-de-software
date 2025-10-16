import { Router } from 'express';
import CourseController from '../controllers/CourseController.js'; // cursoController -> CourseController

const router = Router();

// Rotas READ (Read Routes)
router.get('/', CourseController.findAllCourses); // GET /cursos (listarCursos -> findAllCourses)
router.get('/:id', CourseController.findCourseById); // GET /cursos/:id (listarCursoPorId -> findCourseById)
router.get('/:id/alunos', CourseController.findCourseStudents); // GET /cursos/:id/alunos (listarAlunosDoCurso -> findCourseStudents)

// Rotas WRITE (Write Routes)
router.post('/', CourseController.createCourse); // POST /cursos (criarCurso -> createCourse)
router.put('/:id', CourseController.updateCourse); // PUT /cursos/:id (atualizarCurso -> updateCourse)
router.delete('/:id', CourseController.deleteCourse); // DELETE /cursos/:id (deletarCurso -> deleteCourse)

export default router;
