import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAStudentFromDB = async (studentId: string) => {
  const result = await Student.findOne({ _id: studentId });
  return result;
};

const getAllStudentFormDB = async () => {
  const result = await Student.find({}).sort({ _id: -1 });
  return result;
};

const updateAStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const result = await Student.findOneAndUpdate({ _id: studentId }, payload, {
    new: true,
  });
  return result;
};

const deleteAStudentFromDB = async (studentId: string) => {
  const result = await Student.findOneAndUpdate(
    { _id: studentId },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const studentService = {
  getAStudentFromDB,
  getAllStudentFormDB,
  updateAStudentIntoDB,
  deleteAStudentFromDB,
};
