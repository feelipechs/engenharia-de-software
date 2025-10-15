import db from '../config/db.js';

class CursoService {
    async listarTodos() {
        const [rows] = await db.execute('SELECT id, titulo, descricao FROM cursos');
        return rows;
    }

    async criar(titulo, descricao) {
        const [result] = await db.execute(
            'INSERT INTO cursos (titulo, descricao) VALUES (?, ?)',
            [titulo, descricao]
        );
        return { id: result.insertId, titulo, descricao };
    }

    async listarAlunosPorCurso(cursoId) {
        const sql = `
            SELECT 
                a.id AS aluno_id, 
                a.nome, 
                a.email 
            FROM cursos AS c
            JOIN inscricoes AS i ON c.id = i.curso_id
            JOIN alunos AS a ON i.aluno_id = a.id
            WHERE c.id = ?`;
            
        const [alunos] = await db.execute(sql, [cursoId]);
        return alunos;
    }
}

export default new CursoService();