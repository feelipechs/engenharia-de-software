import db from '../config/db.js';

class AlunoService { // definindo classe
    async listarTodos() { // métodos assincronos, executa consulta sql e retorna o array dos dados
        const [rows] = await db.execute('SELECT id, nome, email FROM alunos');
        return rows;
    }

    async criar(nome, email) {
        const [result] = await db.execute(
            'INSERT INTO alunos (nome, email) VALUES (?, ?)',
            [nome, email]
        );
        return { id: result.insertId, nome, email }; // retorna objeto com infos do aluno
    }

    async listarCursosPorAluno(alunoId) {
        const sql = `
            SELECT 
                c.id AS curso_id, 
                c.titulo, 
                c.descricao 
            FROM alunos AS a
            JOIN inscricoes AS i ON a.id = i.aluno_id
            JOIN cursos AS c ON i.curso_id = c.id
            WHERE a.id = ?`; // retorna um array de objetos, onde cada objeto representa um curso no qual o aluno está matriculado
            
        const [cursos] = await db.execute(sql, [alunoId]);
        return cursos;
    }
}

export default new AlunoService(); // exportando instância