import { Request, Response } from 'express';
import { studentService } from './student.service';

const createAStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await studentService.createAStudentIntoDB({
      ...req.body,
    });
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getAStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getAStudentFromDB(
      req.params.studentId,
    );
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudentFormDB();
    res.status(200).json({
      success: true,
      result: students.length,
      message: 'Students retrieved successfully',
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const updateAStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await studentService.updateAStudentIntoDB(
      req.params.studentId,
      { ...req.body },
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const deleteAStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await studentService.deleteAStudentFromDB(
      req.params.studentId,
    );
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const studentController = {
  createAStudent,
  getAStudent,
  getAllStudent,
  updateAStudent,
  deleteAStudent,
};
