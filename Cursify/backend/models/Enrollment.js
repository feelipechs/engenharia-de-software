import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Enrollment = sequelize.define(
    'Enrollment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Chaves Estrangeiras explícitas para Student e Course,
      // alinhadas com as associações em index.js
      studentId: {
        // Adicionado
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' }, // Supondo o nome da tabela 'students'
        field: 'student_id', // Para alinhar com a convenção snake_case na tabela do DB
      },
      courseId: {
        // Adicionado
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'courses', key: 'id' }, // Supondo o nome da tabela 'courses'
        field: 'course_id', // Para alinhar com a convenção snake_case na tabela do DB
      },

      status: {
        type: DataTypes.STRING, // Ex: 'Ativa', 'Concluída', 'Cancelada'
        defaultValue: 'Ativa',
      },
      enrollment_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'enrollments', // O nome da sua tabela de junção
      timestamps: true,
    },
  );

  return Enrollment;
};
