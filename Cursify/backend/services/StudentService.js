import db from '../models/index.js';

// Renomeando as desestruturações para Inglês
const { Student, Course, Enrollment } = db; // Aluno -> Student, Curso -> Course, Inscricao -> Enrollment

class StudentService {
  // AlunoService -> StudentService
  // ----------------------------------------------------
  // READ (Find All) - Mapeia findAll()
  // ----------------------------------------------------
  async findAll() {
    // listarTodos -> findAll
    // Sequelize: SELECT id, name, email, registration FROM students
    const students = await Student.findAll({
      // alunos -> students, Aluno -> Student
      attributes: ['id', 'name', 'email', 'registration'], // matricula -> registration
    });
    return students;
  }

  // ----------------------------------------------------
  // READ (Find by ID) - Mapeia findById()
  // ----------------------------------------------------
  async findById(id) {
    // listarPorId -> findById
    // Sequelize: SELECT * FROM students WHERE id = :id
    const student = await Student.findByPk(id, {
      // aluno -> student, Aluno -> Student
      attributes: ['id', 'name', 'email', 'registration'], // matricula -> registration
    });
    return student;
  }

  // ----------------------------------------------------
  // CREATE (Create) - Mapeia create()
  // ----------------------------------------------------
  async create(name, email, registration) {
    // criar -> create, matricula -> registration
    // Sequelize: INSERT INTO students (name, email, registration) VALUES (?, ?, ?)
    const newStudent = await Student.create({
      // novoAluno -> newStudent, Aluno -> Student
      name,
      email,
      registration, // Adicionei a registration, que definimos como importante
    });
    // O Sequelize retorna o objeto criado (incluindo o ID e timestamps)
    return newStudent;
  }

  // ----------------------------------------------------
  // UPDATE (Update) - Mapeia update()
  // ----------------------------------------------------
  async update(id, name, email, registration) {
    // atualizar -> update, matricula -> registration
    // Sequelize: UPDATE students SET name=?, email=?, registration=? WHERE id = :id
    const [updatedRows] = await Student.update(
      // Aluno -> Student
      { name, email, registration },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return null; // Nenhum aluno encontrado para atualizar
    }

    // Retorna o aluno atualizado
    return this.findById(id); // listarPorId -> findById
  }

  // ----------------------------------------------------
  // DELETE (Delete) - Mapeia delete()
  // ----------------------------------------------------
  async delete(id) {
    // deletar -> delete
    // Sequelize: DELETE FROM students WHERE id = :id
    const deletedRows = await Student.destroy({
      // Aluno -> Student
      where: { id },
    });

    // Retorna true se alguma linha foi deletada, false caso contrário
    return deletedRows > 0;
  }

  // ----------------------------------------------------
  // READ (Find Courses by Student) - Mapeia findCoursesByStudent()
  // ----------------------------------------------------
  async findCoursesByStudent(studentId) {
    // listarCursosPorAluno -> findCoursesByStudent, alunoId -> studentId
    // Sequelize: SELECT ... FROM Students AS S JOIN Enrollments AS E JOIN Courses AS C WHERE S.id = :studentId
    const studentWithCourses = await Student.findByPk(studentId, {
      // alunoComCursos -> studentWithCourses, Aluno -> Student
      // O Sequelize fará o JOIN automático através do Model Enrollment
      include: [
        {
          model: Enrollment, // Inscricao -> Enrollment
          attributes: ['id', 'createdAt'], // Pega dados da Inscrição (ex: quando foi feita)
          include: [
            {
              model: Course, // Curso -> Course
              attributes: ['id', 'title', 'description', 'price'], // Pega dados do Curso
            },
          ],
        },
      ],
    });

    if (!studentWithCourses) {
      return null;
    }

    // Mapeia para um array mais limpo dos cursos inscritos
    // Inscricaos -> Enrollments. O name da associação pode variar, mantive o padrão plural do Sequelize em Português (Inscricaos) e o novo (Enrollments)
    // Nota: O Sequelize usa o plural da associação. Vou assumir que o novo name é 'Enrollments'
    // Se o seu model Inscricao estiver configurado como 'Inscricaos' no Sequelize, esta linha deve ser ajustada para o name correto após a tradução:
    // Exemplo: studentWithCourses.Enrollments.map((enrollment) => enrollment.Course);
    // Vou usar o plural da tradução para o Javascript:
    return studentWithCourses.Enrollments.map(
      (enrollment) => enrollment.Course,
    ); // Inscricaos -> Enrollments, inscricao -> enrollment, Curso -> Course
  }
}

export default new StudentService(); // AlunoService -> StudentService
