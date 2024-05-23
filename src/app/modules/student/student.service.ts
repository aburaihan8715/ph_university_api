import { TStudent } from './student.interface';
import { Student } from './student.model';

const createAStudentIntoDB = async (studentData: TStudent) => {
  const isStudentExists = await Student.isStudentExists(studentData.id);

  if (isStudentExists) throw new Error('Student already exists!!');

  const result = await Student.create(studentData);
  return result;
  /*
// NOTE: This for instance method
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('Student already exists!!');
  }
  const result = await student.save();
*/
};

const getAStudentFromDB = async (studentId: string) => {
  const result = await Student.findById(studentId);
  return result;
};

const getAllStudentFormDB = async () => {
  const result = await Student.find({}).sort({ _id: -1 });
  return result;
};

// DOUBT:
const updateAStudentIntoDB = async (studentId: string, data: object) => {
  const result = await Student.findByIdAndUpdate(
    studentId,
    { $set: { ...data } },
    { new: true },
  );
  return result;
};

const deleteAStudentFromDB = async (studentId: string) => {
  const result = await Student.findByIdAndUpdate(studentId, {
    $set: { isDeleted: true },
  });
  return result;
};

export const studentService = {
  createAStudentIntoDB,
  getAStudentFromDB,
  getAllStudentFormDB,
  updateAStudentIntoDB,
  deleteAStudentFromDB,
};
