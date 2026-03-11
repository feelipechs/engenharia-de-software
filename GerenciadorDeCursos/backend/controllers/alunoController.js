import alunoService from '../services/alunoService.js';

class AlunoController {
    // GET /alunos
    async listarAlunos(req, res) {
        try {
            const alunos = await alunoService.listarTodos(); // chama o método da service pra obter os dados
            res.status(200).json(alunos);
        } catch (error) {
            console.error('Erro (Controller) ao listar alunos:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao listar alunos.' });
        }
    }

    // POST /alunos
    async criarAluno(req, res) {
        const { nome, email } = req.body; // extrai os dados enviados pelo cliente no corpo da requisição
        
        if (!nome || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }

        try {
            const novoAluno = await alunoService.criar(nome, email);
            res.status(201).json({ message: 'Aluno cadastrado com sucesso!', ...novoAluno });
        } catch (error) {
            console.error('Erro (Controller) ao cadastrar aluno:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao cadastrar aluno.' });
        }
    }

    // GET /alunos/:id/cursos
    async listarCursosDoAluno(req, res) {
        const alunoId = req.params.id;

        try {
            const cursos = await alunoService.listarCursosPorAluno(alunoId);
            
            if (cursos.length === 0) {
                return res.status(200).json({ message: 'Aluno não está inscrito em nenhum curso.', cursos: [] });
            }

            res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro (Controller) ao listar cursos do aluno:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao listar cursos.' });
        }
    }
}

export default new AlunoController();