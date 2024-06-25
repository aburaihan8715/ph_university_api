import express from 'express';
import { studentController } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', studentController.getAllStudent);

router.get('/:id', auth('admin', 'faculty'), studentController.getAStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateAStudent,
);

router.delete('/:id', studentController.deleteAStudent);

export const studentRouter = router;
