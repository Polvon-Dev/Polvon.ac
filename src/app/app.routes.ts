import { Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Dashboard } from './pages/dashboard/dashboard';
import { Projects } from './pages/projects/projects';
import { Coding } from './pages/coding/coding';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'courses', component: Courses },
      { path: 'projects', component: Projects },
      { path: 'coding', component: Coding },
      { path: 'dashboard', component: Dashboard },
    ],
  },
];
