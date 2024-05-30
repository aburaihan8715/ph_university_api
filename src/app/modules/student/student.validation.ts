import { z } from 'zod';

// Define the UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'First name must start with a capital letter and be in a capitalized format!',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, 'Last name cannot be more than 20 characters')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters!',
    }),
});

// Define the Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Define the LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define the Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, 'Password cannot be more than 20 characters'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email must be a valid email address'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
};
