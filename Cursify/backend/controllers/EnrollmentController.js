import EnrollmentService from '../services/EnrollmentService.js'; // inscricaoService -> EnrollmentService

class EnrollmentController {
  // InscricaoController -> EnrollmentController
  // ----------------------------------------------------
  // POST /inscricoes (Create Enrollment)
  // ----------------------------------------------------
  async createEnrollment(req, res) {
    // realizarInscricao -> createEnrollment
    // Nota: as chaves estrangeiras no Sequelize são normalmente camelCase (studentId, courseId)
    const { student_id, course_id } = req.body; // Mantemos as variáveis de body com underline se for a convenção de entrada

    if (!student_id || !course_id) {
      return res
        .status(400)
        .json({ message: 'Os IDs do student e do course são obrigatórios.' });
    }

    try {
      // Chama o service usando as IDs
      const newEnrollment = await EnrollmentService.create(
        // novaInscricao -> newEnrollment, inscrever -> create
        student_id,
        course_id,
      );

      // O service agora retorna o objeto do Model Enrollment
      res.status(201).json({
        message: 'Inscrição realizada com sucesso!',
        // Retorna o objeto completo da inscrição (incluindo o ID da inscrição e timestamps)
        enrollment: newEnrollment.toJSON(), // inscricao -> enrollment
      });
    } catch (error) {
      // Tratamento específico para erro de chave estrangeira (Aluno ou Curso não existem)
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          message: 'Aluno ou Curso não encontrado para realizar a inscrição.',
        });
      }

      console.error('Erro (Controller) ao realizar inscrição:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao realizar inscrição.' });
    }
  }

  // ----------------------------------------------------
  // GET /inscricoes (Find All Enrollments)
  // ----------------------------------------------------
  async findAllEnrollments(req, res) {
    // listarInscricoes -> findAllEnrollments
    try {
      const enrollments = await EnrollmentService.findAll(); // inscricoes -> enrollments, listarTodas -> findAll
      res.status(200).json(enrollments);
    } catch (error) {
      console.error('Erro (Controller) ao listar inscrições:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar inscrições.' });
    }
  }

  // ----------------------------------------------------
  // GET /inscricoes/:id (Find Enrollment by ID)
  // ----------------------------------------------------
  async findEnrollmentById(req, res) {
    // listarInscricaoPorId -> findEnrollmentById
    const id = req.params.id;

    try {
      // Chama o service
      const enrollment = await EnrollmentService.findById(id); // inscricao -> enrollment, listarPorId -> findById

      if (!enrollment) {
        return res
          .status(404)
          .json({ message: `Inscrição com ID ${id} não encontrada.` });
      }

      res.status(200).json(enrollment.toJSON());
    } catch (error) {
      console.error(`Erro (Controller) ao buscar inscrição ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar inscrição.' });
    }
  }

  // ----------------------------------------------------
  // DELETE /inscricoes/:id (Delete Enrollment)
  // ----------------------------------------------------
  async deleteEnrollment(req, res) {
    // deletarInscricao -> deleteEnrollment
    const id = req.params.id; // ID da Inscrição, não do Aluno ou Curso

    try {
      const deleted = await EnrollmentService.delete(id); // foiDeletado -> deleted, deletar -> delete

      if (!deleted) {
        return res
          .status(404)
          .json({ message: `Inscrição com ID ${id} não encontrada.` });
      }

      res.status(204).send(); // 204 No Content para DELETE bem-sucedido
    } catch (error) {
      console.error(`Erro (Controller) ao deletar inscrição ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar inscrição.' });
    }
  }
}

export default new EnrollmentController();
