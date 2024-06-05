import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    data: result,
  });
});

const getAAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.getAAcademicFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

const updateAAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAAcademicFacultyIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAAcademicFaculty,
  getAllAcademicFaculties,
  getAAcademicFaculty,
  updateAAcademicFaculty,
};
