import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { studentRouter } from '../modules/student/student.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { adminRouter } from '../modules/admin/admin.route';
import { courseRouter } from '../modules/course/course.route';
import { semesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRouter } from '../modules/offeredCourse/offeredCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/faculties',
    route: facultyRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/admins',
    route: adminRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },

  {
    path: '/courses',
    route: courseRouter,
  },

  {
    path: '/semester-registrations',
    route: semesterRegistrationRouter,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
