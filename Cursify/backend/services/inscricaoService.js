import db from '../models/index.js';

const { Aluno, Curso, Inscricao } = db;
class InscricaoService {
  // 1. Criar uma nova inscrição
  async inscrever(alunoId, cursoId, status = 'Ativa') {
    return Inscricao.create({
      alunoId: alunoId,
      cursoId: cursoId,
      status: status,
    });
  }

  // 2. Buscar todas as inscrições, incluindo Aluno e Curso associados
  async listarTodas() {
    return Inscricao.findAll({
      include: [
        { model: Aluno, attributes: ['id', 'nome', 'matricula'] },
        { model: Curso, attributes: ['id', 'titulo'] },
      ],
    });
  }

  // 3. Buscar uma inscrição por ID
  async listarPorId(id) {
    return Inscricao.findByPk(id, {
      include: [Aluno, Curso],
    });
  }

  // 4. Excluir uma inscrição
  async deletar(id) {
    return Inscricao.destroy({ where: { id } });
  }
}

export default new InscricaoService();
