import StudentService from '../services/StudentService.js'; // AlunoService -> StudentService

class StudentController {
  // AlunoController -> StudentController
  // ----------------------------------------------------
  // GET /alunos (Find all students)
  // ----------------------------------------------------
  async findAllStudents(req, res) {
    // listarAlunos -> findAllStudents
    try {
      const students = await StudentService.findAll(); // alunos -> students, listarTodos -> findAll
      res.status(200).json(students);
    } catch (error) {
      console.error('Erro (Controller) ao listar alunos:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }

  // ----------------------------------------------------
  // GET /alunos/:id (Find student by ID)
  // ----------------------------------------------------
  async findStudentById(req, res) {
    // listarAlunoPorId -> findStudentById
    const id = req.params.id;
    try {
      const student = await StudentService.findById(id); // aluno -> student, listarPorId -> findById

      if (!student) {
        return res
          .status(404)
          .json({ message: `Aluno com ID ${id} não encontrado.` });
      }

      res.status(200).json(student);
    } catch (error) {
      console.error(`Erro (Controller) ao buscar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar aluno.' });
    }
  }

  // ----------------------------------------------------
  // POST /alunos (Create a new student)
  // ----------------------------------------------------
  async createStudent(req, res) {
    // criarAluno -> createStudent
    // Agora incluímos o campo registration (matricula/RA)
    const { name, email, registration } = req.body; // matricula -> registration

    if (!name || !email || !registration) {
      // A validação agora deve incluir a matrícula
      return res
        .status(400)
        .json({ message: 'Nome, email e matrícula são obrigatórios.' });
    }

    try {
      // Passamos a 'registration' para o serviço
      const newStudent = await StudentService.create(name, email, registration); // novoAluno -> newStudent, criar -> create

      // O serviço Sequelize retorna o objeto do aluno recém-criado
      res.status(201).json({
        message: 'Aluno cadastrado com sucesso!',
        ...newStudent.toJSON(),
      });
    } catch (error) {
      // 1. CAPTURA DE ERRO DE VALIDAÇÃO (Formato da Matrícula, etc.)
      if (error.name === 'SequelizeValidationError') {
        // O SequelizeValidationError armazena os detalhes dos erros em 'errors'
        const validationErrors = error.errors.map((err) => err.message);

        return res.status(400).json({
          message: 'Dados de cadastro inválidos.',
          errors: validationErrors,
        });
      }

      // O Sequelize pode lançar erro de unicidade (ex: matrícula repetida)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json({ message: 'Matrícula ou email já cadastrado.' });
      }
      console.error('Erro (Controller) ao cadastrar aluno:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao cadastrar aluno.' });
    }
  }

  // ----------------------------------------------------
  // PUT /alunos/:id (Update student)
  // ----------------------------------------------------
  async updateStudent(req, res) {
    // atualizarAluno -> updateStudent
    const id = req.params.id;
    const { name, email, registration } = req.body; // matricula -> registration

    try {
      // O service agora retorna o aluno atualizado ou null
      const updatedStudent = await StudentService.update(
        // alunoAtualizado -> updatedStudent, atualizar -> update
        id,
        name,
        email,
        registration,
      );

      if (!updatedStudent) {
        return res.status(404).json({
          message: `Aluno com ID ${id} não encontrado para atualização.`,
        });
      }

      res.status(200).json({
        message: 'Aluno atualizado com sucesso!',
        ...updatedStudent.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json({ message: 'Matrícula ou email já cadastrado.' });
      }
      console.error(`Erro (Controller) ao atualizar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao atualizar aluno.' });
    }
  }

  // ----------------------------------------------------
  // DELETE /alunos/:id (Delete student)
  // ----------------------------------------------------
  async deleteStudent(req, res) {
    // deletarAluno -> deleteStudent
    const id = req.params.id;

    try {
      // O service retorna true ou false
      const deleted = await StudentService.delete(id); // foiDeletado -> deleted, deletar -> delete

      if (!deleted) {
        return res.status(404).json({
          message: `Aluno com ID ${id} não encontrado para exclusão.`,
        });
      }

      res.status(204).send(); // 204 No Content é o padrão para DELETE bem-sucedido
    } catch (error) {
      console.error(`Erro (Controller) ao deletar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar aluno.' });
    }
  }

  // ----------------------------------------------------
  // GET /alunos/:id/cursos (List student courses)
  // ----------------------------------------------------
  async findStudentCourses(req, res) {
    // listarCursosDoAluno -> findStudentCourses
    const studentId = req.params.id; // alunoId -> studentId

    try {
      // O service foi alterado para retornar null se o aluno não existir
      const courses = await StudentService.findCoursesByStudent(studentId); // cursos -> courses, listarCursosPorAluno -> findCoursesByStudent

      if (courses === null) {
        return res
          .status(404)
          .json({ message: `Aluno com ID ${studentId} não encontrado.` });
      }

      if (courses.length === 0) {
        return res.status(200).json({
          message: 'Aluno não está inscrito em nenhum curso.',
          courses: [],
        });
      }

      res.status(200).json(courses);
    } catch (error) {
      console.error('Erro (Controller) ao listar cursos do aluno:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar cursos.' });
    }
  }
}

export default new StudentController(); // AlunoController -> StudentController
