import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createAStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(req.body);
  const newStudent = await UserServices.createAStudentIntoDB(
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
