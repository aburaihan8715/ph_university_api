import Joi from 'joi';

// Define the UserName schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.pattern.base':
        'First name must start with a capital letter and be in a capitalized format!',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .max(20)
    .required()
    .trim()
    .pattern(/^[a-zA-Z]+$/, 'alphabetic characters')
    .messages({
      'string.pattern.base':
        'Last name must contain only alphabetic characters!',
    }),
});

// Define the Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Define the LocalGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define the Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().max(20).required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  isDeleted: Joi.boolean().default(false),
});

export default studentValidationSchema;
