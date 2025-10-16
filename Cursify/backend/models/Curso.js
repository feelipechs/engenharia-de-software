import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Curso = sequelize.define(
    'Curso',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          isDecimal: true,
          min: 0.0, // Garante que o preço não é negativo
        },
      },
    },
    {
      tableName: 'cursos', // Opcional: define o nome exato da tabela
      timestamps: true, // Adiciona colunas createdAt e updatedAt
    },
  );

  return Curso;
};
