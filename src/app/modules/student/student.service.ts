import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAStudentFromDB = async (studentId: string) => {
  const result = await Student.findById(studentId)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getAllStudentFormDB = async () => {
  const result = await Student.find({})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
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
