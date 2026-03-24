import db from '../config/db.js';

class Enrollment {
    async getAll() {
        const sql = `
            SELECT 
                s.id AS student_id, s.name AS student_name,
                c.id AS course_id, c.title AS course_title
            FROM enrollments AS e
            JOIN students AS s ON e.student_id = s.id
            JOIN courses AS c ON e.course_id = c.id
            ORDER BY s.name`;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async enroll(student_id, course_id) {
        const [result] = await db.execute(
            'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
            [student_id, course_id]
        );
        return { student_id, course_id };
    }

    async cancel(student_id, course_id) {
        const [result] = await db.execute(
            'DELETE FROM enrollments WHERE student_id = ? AND course_id = ?',
            [student_id, course_id]
        );
        return result.affectedRows > 0;
    }
}

export default new Enrollment();
