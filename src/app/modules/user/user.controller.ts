import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const newStudent = await userService.createAStudentIntoDB(
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: newStudent,
  });
});
export const userController = {
  createAStudent,
};
