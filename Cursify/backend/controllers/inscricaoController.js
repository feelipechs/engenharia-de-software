import inscricaoService from '../services/inscricaoService.js';

class InscricaoController {
  // ----------------------------------------------------
  // POST /inscricoes (AJUSTADO)
  // ----------------------------------------------------
  async realizarInscricao(req, res) {
    // Nota: as chaves estrangeiras no Sequelize são normalmente camelCase (alunoId, cursoId)
    const { aluno_id, curso_id } = req.body;

    if (!aluno_id || !curso_id) {
      return res
        .status(400)
        .json({ message: 'Os IDs do aluno e do curso são obrigatórios.' });
    }

    try {
      // Chama o service usando as IDs
      const novaInscricao = await inscricaoService.inscrever(
        aluno_id,
        curso_id,
      );

      // O service agora retorna o objeto do Model Inscricao
      res.status(201).json({
        message: 'Inscrição realizada com sucesso!',
        // Retorna o objeto completo da inscrição (incluindo o ID da inscrição e timestamps)
        inscricao: novaInscricao.toJSON(),
      });
    } catch (error) {
      // Tratamento específico para erro de chave estrangeira (Aluno ou Curso não existem)
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(404).json({
          message: 'Aluno ou Curso não encontrado para realizar a inscrição.',
        });
      }

      console.error('Erro (Controller) ao realizar inscrição:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao realizar inscrição.' });
    }
  }

  // ----------------------------------------------------
  // GET /inscricoes (NOVO MÉTODO)
  // ----------------------------------------------------
  async listarInscricoes(req, res) {
    try {
      const inscricoes = await inscricaoService.listarTodas();
      res.status(200).json(inscricoes);
    } catch (error) {
      console.error('Erro (Controller) ao listar inscrições:', error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao listar inscrições.' });
    }
  }

  async listarInscricaoPorId(req, res) {
    const id = req.params.id;

    try {
      // Chama o service
      const inscricao = await inscricaoService.listarPorId(id);

      if (!inscricao) {
        return res
          .status(404)
          .json({ message: `Inscrição com ID ${id} não encontrada.` });
      }

      res.status(200).json(inscricao.toJSON());
    } catch (error) {
      console.error(`Erro (Controller) ao buscar inscrição ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao buscar inscrição.' });
    }
  }

  // ----------------------------------------------------
  // DELETE /inscricoes/:id (NOVO MÉTODO)
  // ----------------------------------------------------
  async deletarInscricao(req, res) {
    const id = req.params.id; // ID da Inscrição, não do Aluno ou Curso

    try {
      const foiDeletado = await inscricaoService.deletar(id);

      if (!foiDeletado) {
        return res
          .status(404)
          .json({ message: `Inscrição com ID ${id} não encontrada.` });
      }

      res.status(204).send(); // 204 No Content para DELETE bem-sucedido
    } catch (error) {
      console.error(`Erro (Controller) ao deletar inscrição ID ${id}:`, error);
      res
        .status(500)
        .json({ message: 'Erro interno do servidor ao deletar inscrição.' });
    }
  }
}

export default new InscricaoController();
