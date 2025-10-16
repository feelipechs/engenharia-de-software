import db from '../models/index.js';

// Renomeando as desestruturações
const { Student, Course, Enrollment } = db; // Aluno -> Student, Curso -> Course, Inscricao -> Enrollment

class CourseService {
  // CursoService -> CourseService
  // ----------------------------------------------------
  // READ (Find All) - Mapeia findAll()
  // ----------------------------------------------------
  async findAll() {
    // listarTodos -> findAll
    // Sequelize: SELECT id, title, description, price FROM courses
    const courses = await Course.findAll({
      // cursos -> courses, Curso -> Course
      attributes: ['id', 'title', 'description', 'price'], // Retorna apenas essas colunas
    });
    return courses;
  }

  // ----------------------------------------------------
  // READ (Find by ID) - Mapeia findById()
  // ----------------------------------------------------
  async findById(id) {
    // listarPorId -> findById
    // Sequelize: SELECT * FROM courses WHERE id = :id
    const course = await Course.findByPk(id, {
      // curso -> course, Curso -> Course
      attributes: ['id', 'title', 'description', 'price'],
    });
    return course;
  }

  // ----------------------------------------------------
  // CREATE (Create) - Mapeia create()
  // ----------------------------------------------------
  async create(title, description, price) {
    // criar -> create
    // Sequelize: INSERT INTO courses (title, description, price) VALUES (?, ?, ?)
    const newCourse = await Course.create({
      // novoCurso -> newCourse, Curso -> Course
      title,
      description,
      price,
    });
    // O Sequelize retorna o objeto criado (incluindo o ID e timestamps)
    return newCourse;
  }

  // ----------------------------------------------------
  // UPDATE (Update) - Mapeia update()
  // ----------------------------------------------------
  async update(id, title, description, price) {
    // atualizar -> update
    // Sequelize: UPDATE courses SET title=?, description=?, price=? WHERE id = :id
    const [updatedRows] = await Course.update(
      // Curso -> Course
      { title, description, price },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return null; // Nenhum curso encontrado para atualizar
    }

    // Retorna o curso atualizado
    return this.findById(id); // listarPorId -> findById
  }

  // ----------------------------------------------------
  // DELETE (Delete) - Mapeia delete()
  // ----------------------------------------------------
  async delete(id) {
    // deletar -> delete
    // Sequelize: DELETE FROM courses WHERE id = :id
    const deletedRows = await Course.destroy({
      // Curso -> Course
      where: { id },
    });

    // Retorna true se alguma linha foi deletada, false caso contrário
    return deletedRows > 0;
  }

  // ----------------------------------------------------
  // READ (Find Students by Course) - Mapeia findStudentsByCourse()
  // ----------------------------------------------------
  async findStudentsByCourse(courseId) {
    // listarAlunosPorCurso -> findStudentsByCourse, cursoId -> courseId
    // Sequelize: SELECT ... FROM Courses AS C JOIN Enrollments AS E JOIN Students AS S WHERE C.id = :courseId
    const courseWithStudents = await Course.findByPk(courseId, {
      // cursoComAlunos -> courseWithStudents, Curso -> Course
      // O Sequelize fará o JOIN automático através do Model Enrollment
      include: [
        {
          model: Enrollment, // Inscricao -> Enrollment
          attributes: ['id', 'createdAt'], // Pega dados da Inscrição (ex: quando foi feita)
          include: [
            {
              model: Student, // Aluno -> Student
              attributes: ['id', 'name', 'email', 'registration'], // Pega dados do Aluno, matricula -> registration
            },
          ],
        },
      ],
    });

    if (!courseWithStudents) {
      return null;
    }

    // Mapeia para um array mais limpo dos alunos inscritos
    // Inscricaos -> Enrollments (Associação padrão do Sequelize)
    // Aluno -> Student
    return courseWithStudents.Enrollments.map(
      (enrollment) => enrollment.Student,
    ); // Inscricaos -> Enrollments, inscricao -> enrollment, Aluno -> Student
  }
}

export default new CourseService(); // CursoService -> CourseService
