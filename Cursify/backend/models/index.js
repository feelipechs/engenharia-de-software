import { DataTypes } from 'sequelize'; // Necessário para os Models individuais
import sequelize from '../config/db.js'; // <-- Importa a instância do sequelize que você corrigiu!

// 1. Importa as funções de definição de cada Model (com o .js obrigatório)
import AlunoModel from './Aluno.js';
import CursoModel from './Curso.js';
import InscricaoModel from './Inscricao.js';

// 2. Inicializa os Models, passando a instância do Sequelize e DataTypes
// O (sequelize) faz a função ser executada e retorna o Model
const Aluno = AlunoModel(sequelize, DataTypes);
const Curso = CursoModel(sequelize, DataTypes);
const Inscricao = InscricaoModel(sequelize, DataTypes);

// 3. Define as Associações (mantido, mas usando os Models importados)
Aluno.hasMany(Inscricao, { foreignKey: 'alunoId' });
Inscricao.belongsTo(Aluno, { foreignKey: 'alunoId' });
Curso.hasMany(Inscricao, { foreignKey: 'cursoId' });
Inscricao.belongsTo(Curso, { foreignKey: 'cursoId' });

// 4. Exporta tudo
const db = {
  sequelize,
  Aluno,
  Curso,
  Inscricao,
};

export default db;
