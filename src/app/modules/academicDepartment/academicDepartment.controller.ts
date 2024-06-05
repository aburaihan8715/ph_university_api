import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrieved successfully',
    data: result,
  });
});

const getAAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.getAAcademicDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  });
});

const updateAAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.updateAAcademicDepartmentIntoDB(
      id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAAcademicDepartment,
  getAllAcademicDepartments,
  getAAcademicDepartment,
  updateAAcademicDepartment,
};
