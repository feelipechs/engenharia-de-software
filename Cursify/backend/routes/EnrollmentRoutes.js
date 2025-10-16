import { Router } from 'express';
import EnrollmentController from '../controllers/EnrollmentController.js'; // InscricaoController -> EnrollmentController

const router = Router();

// Rotas READ (Read Routes)
router.get('/', EnrollmentController.findAllEnrollments); // GET /inscricoes (listarInscricoes -> findAllEnrollments)
router.get('/:id', EnrollmentController.findEnrollmentById); // GET /inscricoes/:id (listarInscricaoPorId -> findEnrollmentById)

// Rotas WRITE/DELETE (Write/Delete Routes)
router.post('/', EnrollmentController.createEnrollment); // POST /inscricoes (realizarInscricao -> createEnrollment)
router.delete('/:id', EnrollmentController.deleteEnrollment); // DELETE /inscricoes/:id (deletarInscricao -> deleteEnrollment)

export default router;
