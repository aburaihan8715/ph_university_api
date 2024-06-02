import express from 'express';
import { studentController } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getAStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateAStudent,
);
router.delete('/:studentId', studentController.deleteAStudent);

export const studentRouter = router;
