import db from '../models/index.js';

const { Aluno, Curso, Inscricao } = db;

class CursoService {
  // ----------------------------------------------------
  // READ (Listar Todos) - Mapeia listarTodos()
  // ----------------------------------------------------
  async listarTodos() {
    // Sequelize: SELECT id, titulo, descricao, preco FROM cursos
    const cursos = await Curso.findAll({
      attributes: ['id', 'titulo', 'descricao', 'preco'], // Retorna apenas essas colunas
    });
    return cursos;
  }

  // ----------------------------------------------------
  // READ (Buscar por ID) - Novo método essencial
  // ----------------------------------------------------
  async listarPorId(id) {
    // Sequelize: SELECT * FROM cursos WHERE id = :id
    const curso = await Curso.findByPk(id, {
      attributes: ['id', 'titulo', 'descricao', 'preco'],
    });
    return curso;
  }

  // ----------------------------------------------------
  // CREATE (Criar) - Mapeia criar()
  // ----------------------------------------------------
  async criar(titulo, descricao, preco) {
    // Sequelize: INSERT INTO cursos (titulo, descricao, preco) VALUES (?, ?, ?)
    const novoCurso = await Curso.create({
      titulo,
      descricao,
      preco,
    });
    // O Sequelize retorna o objeto criado (incluindo o ID e timestamps)
    return novoCurso;
  }

  // ----------------------------------------------------
  // UPDATE (Editar) - Novo método
  // ----------------------------------------------------
  async atualizar(id, titulo, descricao, preco) {
    // Sequelize: UPDATE cursos SET titulo=?, descricao=?, preco=? WHERE id = :id
    const [updatedRows] = await Curso.update(
      { titulo, descricao, preco },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return null; // Nenhum curso encontrado para atualizar
    }

    // Retorna o curso atualizado
    return this.listarPorId(id);
  }

  // ----------------------------------------------------
  // DELETE (Deletar) - Novo método
  // ----------------------------------------------------
  async deletar(id) {
    // Sequelize: DELETE FROM cursos WHERE id = :id
    const deletedRows = await Curso.destroy({
      where: { id },
    });

    // Retorna true se alguma linha foi deletada, false caso contrário
    return deletedRows > 0;
  }

  // ----------------------------------------------------
  // READ (Listar Alunos por Curso) - Mapeia listarAlunosPorCurso()
  // ----------------------------------------------------
  async listarAlunosPorCurso(cursoId) {
    // Sequelize: SELECT ... FROM Cursos AS C JOIN Inscricoes AS I JOIN Alunos AS A WHERE C.id = :cursoId
    const cursoComAlunos = await Curso.findByPk(cursoId, {
      // O Sequelize fará o JOIN automático através do Model Inscricao
      include: [
        {
          model: Inscricao,
          attributes: ['id', 'createdAt'], // Pega dados da Inscrição (ex: quando foi feita)
          include: [
            {
              model: Aluno,
              attributes: ['id', 'nome', 'email', 'matricula'], // Pega dados do Aluno
            },
          ],
        },
      ],
    });

    if (!cursoComAlunos) {
      return null;
    }

    // Mapeia para um array mais limpo dos cursos inscritos
    return cursoComAlunos.Inscricaos.map((inscricao) => inscricao.Aluno);
  }
}

export default new CursoService(); // Use module.exports para melhor compatibilidade em alguns ambientes
