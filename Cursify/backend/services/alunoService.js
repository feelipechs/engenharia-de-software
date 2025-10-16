import db from '../models/index.js';

const { Aluno, Curso, Inscricao } = db;

class AlunoService {
  // ----------------------------------------------------
  // READ (Listar Todos) - Mapeia listarTodos()
  // ----------------------------------------------------
  async listarTodos() {
    // Sequelize: SELECT id, nome, email, matricula FROM alunos
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'email', 'matricula'], // Retorna apenas essas colunas
    });
    return alunos;
  }

  // ----------------------------------------------------
  // READ (Buscar por ID) - Novo método essencial
  // ----------------------------------------------------
  async listarPorId(id) {
    // Sequelize: SELECT * FROM alunos WHERE id = :id
    const aluno = await Aluno.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'matricula'],
    });
    return aluno;
  }

  // ----------------------------------------------------
  // CREATE (Criar) - Mapeia criar()
  // ----------------------------------------------------
  async criar(nome, email, matricula) {
    // Sequelize: INSERT INTO alunos (nome, email, matricula) VALUES (?, ?, ?)
    const novoAluno = await Aluno.create({
      nome,
      email,
      matricula, // Adicionei a matrícula, que definimos como importante
    });
    // O Sequelize retorna o objeto criado (incluindo o ID e timestamps)
    return novoAluno;
  }

  // ----------------------------------------------------
  // UPDATE (Editar) - Novo método
  // ----------------------------------------------------
  async atualizar(id, nome, email, matricula) {
    // Sequelize: UPDATE alunos SET nome=?, email=?, matricula=? WHERE id = :id
    const [updatedRows] = await Aluno.update(
      { nome, email, matricula },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return null; // Nenhum aluno encontrado para atualizar
    }

    // Retorna o aluno atualizado
    return this.listarPorId(id);
  }

  // ----------------------------------------------------
  // DELETE (Deletar) - Novo método
  // ----------------------------------------------------
  async deletar(id) {
    // Sequelize: DELETE FROM alunos WHERE id = :id
    const deletedRows = await Aluno.destroy({
      where: { id },
    });

    // Retorna true se alguma linha foi deletada, false caso contrário
    return deletedRows > 0;
  }

  // ----------------------------------------------------
  // READ (Listar Cursos por Aluno) - Mapeia listarCursosPorAluno()
  // ----------------------------------------------------
  async listarCursosPorAluno(alunoId) {
    // Sequelize: SELECT ... FROM Alunos AS A JOIN Inscricoes AS I JOIN Cursos AS C WHERE A.id = :alunoId
    const alunoComCursos = await Aluno.findByPk(alunoId, {
      // O Sequelize fará o JOIN automático através do Model Inscricao
      include: [
        {
          model: Inscricao,
          attributes: ['id', 'createdAt'], // Pega dados da Inscrição (ex: quando foi feita)
          include: [
            {
              model: Curso,
              attributes: ['id', 'titulo', 'descricao', 'preco'], // Pega dados do Curso
            },
          ],
        },
      ],
    });

    if (!alunoComCursos) {
      return null;
    }

    // Mapeia para um array mais limpo dos cursos inscritos
    return alunoComCursos.Inscricaos.map((inscricao) => inscricao.Curso);
  }
}

export default new AlunoService(); // Use module.exports para melhor compatibilidade em alguns ambientes
