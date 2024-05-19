import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createAStudentIntoDB = async (studentData: TStudent) => {
  const result = await StudentModel.create(studentData);
  return result;
};
const getAStudentFromDB = async (studentId: string) => {
  const result = await StudentModel.findById(studentId);
  return result;
};
const getAllStudentFormDB = async () => {
  const result = await StudentModel.find({});
  return result;
};
// DOUBT:
const updateAStudentIntoDB = async (studentId: string, data: object) => {
  const result = await StudentModel.findByIdAndUpdate(
    studentId,
    { $set: { ...data } },
    { new: true },
  );
  return result;
};
const deleteAStudentFromDB = async (studentId: string) => {
  const result = await StudentModel.findByIdAndDelete(studentId);
  return result;
};

export const studentService = {
  createAStudentIntoDB,
  getAStudentFromDB,
  getAllStudentFormDB,
  updateAStudentIntoDB,
  deleteAStudentFromDB,
};
