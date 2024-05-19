import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router
  .route('/')
  .post(studentController.createAStudent)
  .get(studentController.getAllStudent);

router.get('/:studentId', studentController.getAStudent);
router.patch('/:studentId', studentController.updateAStudent);
router.delete('/:studentId', studentController.deleteAStudent);

export const studentRouter = router;
