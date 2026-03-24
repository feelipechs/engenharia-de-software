import express from 'express';
import studentController from '../controllers/studentController.js';

const router = express.Router();

router.get('/', studentController.listStudents);
router.get('/:id', studentController.getStudent);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id/courses', studentController.listCoursesOfStudent);

export default router;
