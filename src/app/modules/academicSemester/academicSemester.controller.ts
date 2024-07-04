import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.createAAcademicSemesterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.getAllAcademicSemestersFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters retrieved successfully',
    meta: result.meta,
    data: result,
  });
});

const getAAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAAcademicSemesterFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const updateAAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.updateAAcademicSemesterIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAAcademicSemester,
  getAllAcademicSemesters,
  getAAcademicSemester,
  updateAAcademicSemester,
};
