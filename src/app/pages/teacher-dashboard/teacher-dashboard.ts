import { Component, inject, OnInit } from '@angular/core';
import { MyCoursesService } from '../my-courses/my-courses-service';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css',
})
export class TeacherDashboard implements OnInit {
  courses: any[] = [];
  private myCoursesService = inject(MyCoursesService);

  ngOnInit(): void {
    this.myCoursesService.courses$.subscribe((data) => {
      this.courses = data;
      console.log('Kurs kelib tushdi', this.courses.length);
    });
  }
}
