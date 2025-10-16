import cursoService from '../services/cursoService.js';

class CursoController {
  // GET /cursos
  async listarCursos(req, res) {
    try {
      const cursos = await cursoService.listarTodos();
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro (Controller) ao listar cursos:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }

  async listarCursoPorId(req, res) {
    const id = req.params.id;

    try {
      // 1. Chamar a service com o ID da requisição
      const curso = await cursoService.listarPorId(id);

      // 2. Verificar se o curso existe APÓS a chamada da service
      if (!curso) {
        return res
          .status(404)
          .json({ message: `Curso com ID ${id} não encontrado.` });
      }

      res.status(200).json(curso);
    } catch (error) {
      console.error(`Erro (Controller) ao buscar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar curso.' });
    }
  }

  // POST /cursos
  async criarCurso(req, res) {
    const { titulo, descricao, preco } = req.body;

    if (!titulo || !descricao || !preco) {
      return res
        .status(400)
        .json({ message: 'Título, descrição e preços são obrigatórios.' });
    }

    try {
      const novoCurso = await cursoService.criar(titulo, descricao, preco);
      res.status(201).json({
        message: 'Curso cadastrado com sucesso!',
        ...novoCurso.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Título já cadastrado.' });
      }
      console.error('Erro (Controller) ao cadastrar curso:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao cadastrar curso.' });
    }
  }

  // PUT /cursos/:id
  async atualizarCurso(req, res) {
    const id = req.params.id;
    const { titulo, descricao, preco } = req.body;

    try {
      const cursoAtualizado = await cursoService.atualizar(
        id,
        titulo,
        descricao,
        preco,
      );
      if (!cursoAtualizado) {
        return res.status(404).json({
          message: `Curso com ID ${id} não encontrado para atualização.`,
        });
      }

      res.status(200).json({
        message: 'Curso atualizado com sucesso!',
        ...cursoAtualizado.toJSON(),
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Título já cadastrado.' });
      }
      console.error(`Erro (Controller) ao atualizar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao atualizar curso.' });
    }
  }

  // DELETE /cursos/:id
  async deletarCurso(req, res) {
    const id = req.params.id;

    try {
      const foiDeletado = await cursoService.deletar(id);

      if (!foiDeletado) {
        return res.status(404).json({
          message: `Curso com ID ${id} não encontrado para exclusão.`,
        });
      }

      res.status(204).send();
    } catch (error) {
      console.error(`Erro (Controller) ao deletar curso ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar curso.' });
    }
  }

  // GET /cursos/:id/alunos
  async listarAlunosDoCurso(req, res) {
    const cursoId = req.params.id;

    try {
      const alunos = await cursoService.listarAlunosPorCurso(cursoId);

      if (alunos === null) {
        return res
          .status(404)
          .json({ message: `Curso com ID ${cursoId} não encontrado.` });
      }

      if (alunos.length === 0) {
        return res
          .status(200)
          .json({ message: 'Nenhum aluno inscrito neste curso.', alunos: [] });
      }

      res.status(200).json(alunos);
    } catch (error) {
      console.error('Erro (Controller) ao listar alunos do curso:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar alunos.' });
    }
  }
}

export default new CursoController();
