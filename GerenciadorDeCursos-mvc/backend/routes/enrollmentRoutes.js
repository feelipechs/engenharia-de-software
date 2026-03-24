import express from 'express';
import enrollmentController from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/', enrollmentController.listEnrollments);
router.post('/', enrollmentController.enrollStudent);
router.delete('/', enrollmentController.cancelEnrollment);

export default router;
