import inscricaoService from '../services/inscricaoService.js';

class InscricaoController {
    // POST /inscricoes
    async realizarInscricao(req, res) {
        const { aluno_id, curso_id } = req.body;
        if (!aluno_id || !curso_id) {
            return res.status(400).json({ message: 'Os IDs do aluno e do curso são obrigatórios.' });
        }

        try {
            await inscricaoService.inscrever(aluno_id, curso_id);
            
            res.status(201).json({ 
                message: `Aluno ID ${aluno_id} inscrito no Curso ID ${curso_id} com sucesso!`,
                aluno_id,
                curso_id
            });
        } catch (error) {    
            console.error('Erro (Controller) ao realizar inscrição:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao realizar inscrição.' });
        }
    }
}

export default new InscricaoController();