import alunoService from '../services/alunoService.js';

class AlunoController {
  // ----------------------------------------------------
  // GET /alunos
  // ----------------------------------------------------
  async listarAlunos(req, res) {
    try {
      const alunos = await alunoService.listarTodos();
      res.status(200).json(alunos);
    } catch (error) {
      console.error('Erro (Controller) ao listar alunos:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }

  // ----------------------------------------------------
  // GET /alunos/:id (NOVO MÉTODO)
  // ----------------------------------------------------
  async listarAlunoPorId(req, res) {
    const id = req.params.id;
    try {
      const aluno = await alunoService.listarPorId(id);

      if (!aluno) {
        return res
          .status(404)
          .json({ message: `Aluno com ID ${id} não encontrado.` });
      }

      res.status(200).json(aluno);
    } catch (error) {
      console.error(`Erro (Controller) ao buscar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar aluno.' });
    }
  }

  // ----------------------------------------------------
  // POST /alunos (AJUSTADO: Adiciona 'matricula')
  // ----------------------------------------------------
  async criarAluno(req, res) {
    // Agora incluímos o campo matricula (RA)
    const { nome, email, matricula } = req.body;

    if (!nome || !email || !matricula) {
      // A validação agora deve incluir a matrícula
      return res
        .status(400)
        .json({ message: 'Nome, email e matrícula são obrigatórios.' });
    }

    try {
      // Passamos a matricula para o serviço
      const novoAluno = await alunoService.criar(nome, email, matricula);

      // O serviço Sequelize retorna o objeto do aluno recém-criado
      res.status(201).json({
        message: 'Aluno cadastrado com sucesso!',
        ...novoAluno.toJSON(),
      });
    } catch (error) {
      // 1. CAPTURA DE ERRO DE VALIDAÇÃO (Formato da Matrícula, etc.)
      if (error.name === 'SequelizeValidationError') {
        // O SequelizeValidationError armazena os detalhes dos erros em 'errors'
        const validationErrors = error.errors.map((err) => err.message);

        return res.status(400).json({
          message: 'Dados de cadastro inválidos.',
          errors: validationErrors,
        });
      }

      // O Sequelize pode lançar erro de unicidade (ex: matrícula repetida)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json({ message: 'Matrícula ou email já cadastrado.' });
      }
      console.error('Erro (Controller) ao cadastrar aluno:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao cadastrar aluno.' });
    }
  }

  // ----------------------------------------------------
  // PUT /alunos/:id (NOVO MÉTODO)
  // ----------------------------------------------------
  async atualizarAluno(req, res) {
    const id = req.params.id;
    const { nome, email, matricula } = req.body;

    try {
      // O service agora retorna o aluno atualizado ou null
      const alunoAtualizado = await alunoService.atualizar(
        id,
        nome,
        email,
        matricula,
      );

      if (!alunoAtualizado) {
        return res.status(404).json({
          message: `Aluno com ID ${id} não encontrado para atualização.`,
        });
      }

      res.status(200).json({
        message: 'Aluno atualizado com sucesso!',
        ...alunoAtualizado.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(409)
          .json({ message: 'Matrícula ou email já cadastrado.' });
      }
      console.error(`Erro (Controller) ao atualizar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao atualizar aluno.' });
    }
  }

  // ----------------------------------------------------
  // DELETE /alunos/:id (NOVO MÉTODO)
  // ----------------------------------------------------
  async deletarAluno(req, res) {
    const id = req.params.id;

    try {
      // O service retorna true ou false
      const foiDeletado = await alunoService.deletar(id);

      if (!foiDeletado) {
        return res.status(404).json({
          message: `Aluno com ID ${id} não encontrado para exclusão.`,
        });
      }

      res.status(204).send(); // 204 No Content é o padrão para DELETE bem-sucedido
    } catch (error) {
      console.error(`Erro (Controller) ao deletar aluno ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar aluno.' });
    }
  }

  // ----------------------------------------------------
  // GET /alunos/:id/cursos (Sem alteração no corpo)
  // ----------------------------------------------------
  async listarCursosDoAluno(req, res) {
    const alunoId = req.params.id;

    try {
      // O service foi alterado para retornar null se o aluno não existir
      const cursos = await alunoService.listarCursosPorAluno(alunoId);

      if (cursos === null) {
        return res
          .status(404)
          .json({ message: `Aluno com ID ${alunoId} não encontrado.` });
      }

      if (cursos.length === 0) {
        return res.status(200).json({
          message: 'Aluno não está inscrito em nenhum curso.',
          cursos: [],
        });
      }

      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro (Controller) ao listar cursos do aluno:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar cursos.' });
    }
  }
}

export default new AlunoController();
