import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.listCourses);
router.get('/:id', courseController.getCourse);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/:id/students', courseController.listStudentsOfCourse);

export default router;
