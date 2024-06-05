import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getAAcademicSemester);
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAAcademicSemester,
);

export const academicSemesterRouter = router;
