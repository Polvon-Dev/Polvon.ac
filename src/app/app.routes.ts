import { Routes } from '@angular/router';
import { MainLayout } from './layoutes/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Dashboard } from './pages/dashboard/dashboard';
import { Projects } from './pages/projects/projects';
import { Coding } from './pages/coding/coding';
import { ContactUs } from './pages/contact-us/contact-us';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { CoursesDetailsPage } from './pages/courses-details-page/courses-details-page';
import { AddCourses } from './pages/add-courses/add-courses';
import { TeacherDashboard } from './pages/teacher-dashboard/teacher-dashboard';
import { MyCourses } from './pages/my-courses/my-courses';
import { StudentEnrolled } from './pages/student-enrolled/student-enrolled';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminManageCourses } from './pages/admin-manage-courses/admin-manage-courses';
import { AdminManageUsers } from './pages/admin-manage-users/admin-manage-users';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'courses', component: Courses },
      { path: 'courses/:id', component: CoursesDetailsPage },
      { path: 'projects', component: Projects },
      { path: 'coding', component: Coding },
      { path: 'dashboard', component: Dashboard },
      { path: 'contactUs', component: ContactUs },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'teacherDashboard', component: TeacherDashboard },
      { path: 'addCourses', component: AddCourses },
      { path: 'myCourses', component: MyCourses },
      { path: 'studentEnrolled', component: StudentEnrolled },
      { path: 'adminDashboard', component: AdminDashboard },
      { path: 'manageCourses', component: AdminManageCourses },
      { path: 'manageUsers', component: AdminManageUsers },
    ],
  },
];
