import db from '../models/index.js';

// Renomeando as desestruturações
const { Student, Course, Enrollment } = db; // Aluno -> Student, Curso -> Course, Inscricao -> Enrollment

class EnrollmentService {
  // InscricaoService -> EnrollmentService
  // 1. Criar uma nova inscrição
  async create(studentId, courseId, status = 'Ativa') {
    // inscrever -> create, alunoId -> studentId, cursoId -> courseId
    return Enrollment.create({
      // Inscricao -> Enrollment
      studentId: studentId, // alunoId -> studentId
      courseId: courseId, // cursoId -> courseId
      status: status,
    });
  }

  // 2. Buscar todas as inscrições, incluindo Aluno e Curso associados
  async findAll() {
    // listarTodas -> findAll
    return Enrollment.findAll({
      // Inscricao -> Enrollment
      include: [
        { model: Student, attributes: ['id', 'name', 'registration'] }, // Aluno -> Student, matricula -> registration
        { model: Course, attributes: ['id', 'title'] }, // Curso -> Course
      ],
    });
  }

  // 3. Buscar uma inscrição por ID
  async findById(id) {
    // listarPorId -> findById
    return Enrollment.findByPk(id, {
      // Inscricao -> Enrollment
      include: [Student, Course], // Aluno -> Student, Curso -> Course
    });
  }

  // 4. Excluir uma inscrição
  async delete(id) {
    // deletar -> delete
    // O service retorna o número de linhas deletadas, que é tratado no controller.
    return Enrollment.destroy({ where: { id } }); // Inscricao -> Enrollment
  }
}

export default new EnrollmentService(); // InscricaoService -> EnrollmentService
