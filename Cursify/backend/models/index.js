import { DataTypes } from 'sequelize'; // Necessário para os Models individuais
import sequelize from '../config/db.js'; // <-- Importa a instância do sequelize que você corrigiu!

// 1. Importa as funções de definição de cada Model (com o .js obrigatório)
// Atualizando as importações para os nomes em inglês
import StudentModel from './Student.js'; // AlunoModel -> StudentModel
import CourseModel from './Course.js'; // CursoModel -> CourseModel
import EnrollmentModel from './Enrollment.js'; // InscricaoModel -> EnrollmentModel

// 2. Inicializa os Models, passando a instância do Sequelize e DataTypes
// O (sequelize) faz a função ser executada e retorna o Model
const Student = StudentModel(sequelize, DataTypes); // Aluno -> Student
const Course = CourseModel(sequelize, DataTypes); // Curso -> Course
const Enrollment = EnrollmentModel(sequelize, DataTypes); // Inscricao -> Enrollment

// 3. Define as Associações (mantido, mas usando os Models traduzidos)
// studentId e courseId já estavam em camelCase, o que é ótimo.
Student.hasMany(Enrollment, { foreignKey: 'studentId' }); // Aluno -> Student, Inscricao -> Enrollment
Enrollment.belongsTo(Student, { foreignKey: 'studentId' }); // Inscricao -> Enrollment, Aluno -> Student
Course.hasMany(Enrollment, { foreignKey: 'courseId' }); // Curso -> Course, Inscricao -> Enrollment
Enrollment.belongsTo(Course, { foreignKey: 'courseId' }); // Inscricao -> Enrollment, Curso -> Course

// 4. Exporta tudo
// Atualizando os nomes dos Models no objeto db
const db = {
  sequelize,
  Student, // Aluno -> Student
  Course, // Curso -> Course
  Enrollment, // Inscricao -> Enrollment
};

export default db;
