import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Student = sequelize.define(
    'Student',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      registration: {
        type: DataTypes.STRING(10), // Limite a string
        unique: true,
        allowNull: false,
        validate: {
          is: {
            // A chave 'args' contém a expressão regular
            args: /^[A-Z]{2}-\d{4}$/,

            // A chave 'msg' para este validador específico
            msg: "A criação de matrícula deve ser no modelo: 'AA-1234'",
          },
        },
      },
    },
    {
      tableName: 'students', // Opcional: define o nome exato da tabela
      timestamps: true, // Adiciona colunas createdAt e updatedAt
    },
  );

  return Student;
};
