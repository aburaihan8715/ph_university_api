import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { RequestHandler } from 'express';

const getAStudent = catchAsync(async (req, res) => {
  const student = await studentServices.getAStudentFromDB(req.params.id);
  if (!student)
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');

  //  send response to the client
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: student,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateAStudent = catchAsync(async (req, res) => {
  const updatedStudent = await studentServices.updateAStudentIntoDB(
    req.params.id,
    req.body.student,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: updatedStudent,
  });
});

const deleteAStudent = catchAsync(async (req, res) => {
  await studentServices.deleteAStudentFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: null,
  });
});

export const studentController = {
  getAStudent,
  getAllStudents,
  updateAStudent,
  deleteAStudent,
};
