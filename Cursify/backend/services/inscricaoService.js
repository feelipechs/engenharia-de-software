import db from '../config/db.js';

class InscricaoService {
    async inscrever(aluno_id, curso_id) {
        const [result] = await db.execute(
            'INSERT INTO inscricoes (aluno_id, curso_id) VALUES (?, ?)',
            [aluno_id, curso_id]
        );
        return { aluno_id, curso_id };
    }
}

export default new InscricaoService();