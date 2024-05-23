import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../config';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

// NOTE: If we use zod or joi, we can skip mongoose builtin validation

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const capitalized =
          value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
        return capitalized === value;
      },
      message: '{VALUE} is not a capitalized format!',
    },
  },

  middleName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxLength: [20, 'Name can not be more than 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'last {VALUE} is not a valid!',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },

  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },

  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },

  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },

  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },

  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },

  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },

  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      maxLength: [20, 'Password can not be more than 20 characters'],
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },

    dateOfBirth: { type: String },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Email {VALUE} is not a valid format!',
      },
    },

    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },

    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },

    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },

    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },

    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },

    profileImg: { type: String },

    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE
studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// QUERY MIDDLEWARE
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// INSTANCE METHODS
/*
studentSchema.methods.isStudentExists = async function(userId: string) {
  const user = Student.findOne({ id: userId });
  return user;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
*/

// STATICS METHODS
studentSchema.statics.isStudentExists = async function (userId: string) {
  const user = await Student.findOne({ id: userId });
  return user;
};

// VIRTUAL PROPERTY
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
