import CourseService from '../services/CourseService.js'; // cursoService -> CourseService

class CourseController {
  // CursoController -> CourseController
  // GET /cursos
  async findAllCourses(req, res) {
    // listarCursos -> findAllCourses
    try {
      const courses = await CourseService.findAll(); // cursos -> courses, listarTodos -> findAll
      res.status(200).json(courses);
    } catch (error) {
      console.error('Erro (Controller) ao listar cursos:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }

  // GET /cursos/:id
  async findCourseById(req, res) {
    // listarCursoPorId -> findCourseById
    const id = req.params.id;

    try {
      // 1. Chamar a service com o ID da requisição
      const course = await CourseService.findById(id); // curso -> course, listarPorId -> findById

      // 2. Verificar se o curso existe APÓS a chamada da service
      if (!course) {
        return res
          .status(404)
          .json({ message: `Curso com ID ${id} não encontrado.` });
      }

      res.status(200).json(course);
    } catch (error) {
      console.error(`Erro (Controller) ao buscar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar curso.' });
    }
  }

  // POST /cursos
  async createCourse(req, res) {
    // criarCurso -> createCourse
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ message: 'Título, descrição e preços são obrigatórios.' });
    }

    try {
      const newCourse = await CourseService.create(title, description, price); // novoCurso -> newCourse, criar -> create
      res.status(201).json({
        message: 'Curso cadastrado com sucesso!',
        ...newCourse.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Título já cadastrado.' });
      }
      console.error('Erro (Controller) ao cadastrar curso:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao cadastrar curso.' });
    }
  }

  // PUT /cursos/:id
  async updateCourse(req, res) {
    // atualizarCurso -> updateCourse
    const id = req.params.id;
    const { title, description, price } = req.body;

    try {
      const updatedCourse = await CourseService.update(
        // cursoAtualizado -> updatedCourse, atualizar -> update
        id,
        title,
        description,
        price,
      );
      if (!updatedCourse) {
        return res.status(404).json({
          message: `Curso com ID ${id} não encontrado para atualização.`,
        });
      }

      res.status(200).json({
        message: 'Curso atualizado com sucesso!',
        ...updatedCourse.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Título já cadastrado.' });
      }
      console.error(`Erro (Controller) ao atualizar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao atualizar curso.' });
    }
  }

  // DELETE /cursos/:id
  async deleteCourse(req, res) {
    // deletarCurso -> deleteCourse
    const id = req.params.id;

    try {
      const deleted = await CourseService.delete(id); // foiDeletado -> deleted, deletar -> delete

      if (!deleted) {
        return res.status(404).json({
          message: `Curso com ID ${id} não encontrado para exclusão.`,
        });
      }

      res.status(204).send();
    } catch (error) {
      console.error(`Erro (Controller) ao deletar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar curso.' });
    }
  }

  // GET /cursos/:id/alunos
  async findCourseStudents(req, res) {
    // listarAlunosDoCurso -> findCourseStudents
    const courseId = req.params.id; // cursoId -> courseId

    try {
      const students = await CourseService.findStudentsByCourse(courseId); // alunos -> students, listarAlunosPorCurso -> findStudentsByCourse

      if (students === null) {
        return res
          .status(404)
          .json({ message: `Curso com ID ${courseId} não encontrado.` });
      }

      if (students.length === 0) {
        return res.status(200).json({
          message: 'Nenhum aluno inscrito neste curso.',
          students: [],
        });
      }

      res.status(200).json(students);
    } catch (error) {
      console.error('Erro (Controller) ao listar alunos do curso:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }
}

export default new CourseController();
