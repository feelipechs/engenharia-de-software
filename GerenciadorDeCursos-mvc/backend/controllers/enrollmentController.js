import Enrollment from '../models/Enrollment.js';

class EnrollmentController {
    async listEnrollments(req, res) {
        try {
            const enrollments = await Enrollment.getAll();
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar inscrições.' });
        }
    }

    async enrollStudent(req, res) {
        const { student_id, course_id } = req.body;
        if (!student_id || !course_id) {
            return res.status(400).json({ message: 'IDs do aluno e do curso são obrigatórios.' });
        }
        try {
            await Enrollment.enroll(student_id, course_id);
            res.status(201).json({
                message: `Aluno ID ${student_id} inscrito no Curso ID ${course_id} com sucesso!`,
                student_id,
                course_id
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao realizar inscrição.' });
        }
    }

    async cancelEnrollment(req, res) {
        const { student_id, course_id } = req.body;
        if (!student_id || !course_id) {
            return res.status(400).json({ message: 'IDs do aluno e do curso são obrigatórios.' });
        }
        try {
            const canceled = await Enrollment.cancel(student_id, course_id);
            if (!canceled) return res.status(404).json({ message: 'Inscrição não encontrada.' });
            res.status(200).json({ message: 'Inscrição cancelada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cancelar inscrição.' });
        }
    }
}

export default new EnrollmentController();
