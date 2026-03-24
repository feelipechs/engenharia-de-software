import Course from '../models/Course.js';

class CourseController {
    async listCourses(req, res) {
        try {
            const courses = await Course.getAll();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar cursos.' });
        }
    }

    async getCourse(req, res) {
        try {
            const course = await Course.getById(req.params.id);
            if (!course) return res.status(404).json({ message: 'Curso não encontrado.' });
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar curso.' });
        }
    }

    async createCourse(req, res) {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Título e descrição são obrigatórios.' });
        }
        try {
            const newCourse = await Course.create(title, description);
            res.status(201).json({ message: 'Curso cadastrado com sucesso!', ...newCourse });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar curso.' });
        }
    }

    async updateCourse(req, res) {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Título e descrição são obrigatórios.' });
        }
        try {
            const updated = await Course.update(req.params.id, title, description);
            if (!updated) return res.status(404).json({ message: 'Curso não encontrado.' });
            res.status(200).json({ message: 'Curso atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar curso.' });
        }
    }

    async deleteCourse(req, res) {
        try {
            const deleted = await Course.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Curso não encontrado.' });
            res.status(200).json({ message: 'Curso removido com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover curso.' });
        }
    }

    async listStudentsOfCourse(req, res) {
        try {
            const students = await Course.getStudentsByCourse(req.params.id);
            if (students.length === 0) {
                return res.status(200).json({ message: 'Nenhum aluno inscrito neste curso.', students: [] });
            }
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar alunos do curso.' });
        }
    }
}

export default new CourseController();
