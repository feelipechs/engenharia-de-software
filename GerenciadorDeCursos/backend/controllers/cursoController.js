import cursoService from "../services/cursoService.js";

class CursoController {
    // GET /cursos
    async listarCursos(req, res) {
        try {
            const cursos = await cursoService.listarTodos();
            res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro (Controller) ao listar cursos:', error)
            res.status(500).json({ message: 'Erro interno do servidor ao listar cursos.' });
        }
    }

    // POST /cursos
    async criarCurso(req, res) {
        const { titulo, descricao } = req.body;

        if (!titulo || !descricao) {
            return res.status(400).json({ message: 'Título e descrição são obrigatórios.' });
        }

        try {
            const novoCurso = await cursoService.criar(titulo, descricao);
            res.status(201).json({ message: 'Curso cadastrado com sucesso!', ...novoCurso });
        } catch (error) {
            console.error('Erro (Controller) ao cadastrar curso:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao cadastrar curso.' });
        }
    }

    // GET /cursos/:id/alunos
    async listarAlunosDoCurso(req, res) {
        const cursoId = req.params.id;

        try {
            const alunos = await cursoService.listarAlunosPorCurso(cursoId);

            if (alunos.length === 0) {
                return res.status(200).json({ message: 'Nenhum aluno inscrito neste curso.', alunos: [] });
            }

            res.status(200).json(alunos);
        } catch (error) {
            console.error('Erro (Controller) ao listar alunos do curso:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao listar alunos.' });
        }
    }
}

export default new CursoController();