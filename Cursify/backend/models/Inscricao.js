import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Inscricao = sequelize.define(
    'Inscricao',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Campos de chave estrangeira que o Sequelize adicionará automaticamente
      // (alunoId e cursoId), mas você pode defini-los explicitamente se quiser

      // Exemplo de campo extra na tabela de junção:
      status: {
        type: DataTypes.STRING, // Ex: 'Ativa', 'Concluída', 'Cancelada'
        defaultValue: 'Ativa',
      },
      data_inscricao: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'inscricoes', // Usa o nome que você já possui
      timestamps: true,
    },
  );

  return Inscricao;
};
