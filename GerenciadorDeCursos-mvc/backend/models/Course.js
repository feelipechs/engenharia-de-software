import db from '../config/db.js';

class Course {
    async getAll() {
        const [rows] = await db.execute('SELECT id, title, description FROM courses');
        return rows;
    }

    async getById(id) {
        const [rows] = await db.execute('SELECT id, title, description FROM courses WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async create(title, description) {
        const [result] = await db.execute(
            'INSERT INTO courses (title, description) VALUES (?, ?)',
            [title, description]
        );
        return { id: result.insertId, title, description };
    }

    async update(id, title, description) {
        const [result] = await db.execute(
            'UPDATE courses SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [rows] = await db.execute('DELETE FROM courses WHERE id = ?', [id]);
        return rows.affectedRows > 0;
    }

    async getStudentsByCourse(courseId) {
        const sql = `
            SELECT s.id AS student_id, s.name, s.email
            FROM courses AS c
            JOIN enrollments AS e ON c.id = e.course_id
            JOIN students AS s ON e.student_id = s.id
            WHERE c.id = ?`;
        const [rows] = await db.execute(sql, [courseId]);
        return rows;
    }
}

export default new Course();
