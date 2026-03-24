import db from '../config/db.js';

class Student {
    async getAll() {
        const [rows] = await db.execute('SELECT id, name, email FROM students');
        return rows;
    }

    async getById(id) {
        const [rows] = await db.execute('SELECT id, name, email FROM students WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async create(name, email) {
        const [result] = await db.execute(
            'INSERT INTO students (name, email) VALUES (?, ?)',
            [name, email]
        );
        return { id: result.insertId, name, email };
    }

    async update(id, name, email) {
        const [result] = await db.execute(
            'UPDATE students SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await db.execute('DELETE FROM students WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    async getCoursesByStudent(studentId) {
        const sql = `
            SELECT c.id AS course_id, c.title, c.description
            FROM students AS s
            JOIN enrollments AS e ON s.id = e.student_id
            JOIN courses AS c ON e.course_id = c.id
            WHERE s.id = ?`;
        const [rows] = await db.execute(sql, [studentId]);
        return rows;
    }
}

export default new Student();
