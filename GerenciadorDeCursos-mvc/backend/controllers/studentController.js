import Student from '../models/Student.js';

class StudentController {
    async listStudents(req, res) {
        try {
            const students = await Student.getAll();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar alunos.' });
        }
    }

    async getStudent(req, res) {
        try {
            const student = await Student.getById(req.params.id);
            if (!student) return res.status(404).json({ message: 'Aluno não encontrado.' });
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar aluno.' });
        }
    }

    async createStudent(req, res) {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }
        try {
            const newStudent = await Student.create(name, email);
            res.status(201).json({ message: 'Aluno cadastrado com sucesso!', ...newStudent });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar aluno.' });
        }
    }

    async updateStudent(req, res) {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }
        try {
            const updated = await Student.update(req.params.id, name, email);
            if (!updated) return res.status(404).json({ message: 'Aluno não encontrado.' });
            res.status(200).json({ message: 'Aluno atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar aluno.' });
        }
    }

    async deleteStudent(req, res) {
        try {
            const deleted = await Student.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Aluno não encontrado.' });
            res.status(200).json({ message: 'Aluno removido com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover aluno.' });
        }
    }

    async listCoursesOfStudent(req, res) {
        try {
            const courses = await Student.getCoursesByStudent(req.params.id);
            if (courses.length === 0) {
                return res.status(200).json({ message: 'Aluno não está inscrito em nenhum curso.', courses: [] });
            }
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar cursos do aluno.' });
        }
    }
}

export default new StudentController();
