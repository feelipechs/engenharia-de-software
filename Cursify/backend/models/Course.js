import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Courses = sequelize.define(
    'Courses',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
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
      tableName: 'courses', // Opcional: define o nome exato da tabela
      timestamps: true, // Adiciona colunas createdAt e updatedAt
    },
  );

  return Courses;
};
