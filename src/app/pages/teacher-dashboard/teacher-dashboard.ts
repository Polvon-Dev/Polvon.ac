import { Component, inject, OnInit } from '@angular/core';
import { MyCoursesService } from '../my-courses/my-courses-service';
import { CommonModule } from '@angular/common';
import { StudentEnrolledService } from '../student-enrolled/student-enrolled-service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css',
  standalone: true,
})
export class TeacherDashboard implements OnInit {
  totalCourses: any[] = [];
  loading: boolean = true;
  totalStudents: any;
  totalPrice!: number;
  private myCoursesService = inject(MyCoursesService);
  constructor(private enrolledStudents: StudentEnrolledService) {}

  ngOnInit(): void {
    combineLatest([this.myCoursesService.courses$, this.enrolledStudents.students$]).subscribe(
      ([courses, students]) => {
        this.totalCourses = courses;

        this.totalStudents = students;
        this.calculateTotalPrice();
        this.loading = false;
      }
    );
  }
  calculateTotalPrice() {
    if (!this.totalCourses?.length || !this.totalStudents?.length) {
      this.totalPrice = 0;
      return;
    }
    let total = 0;

    for (let course of this.totalCourses) {
      const enrolledCount = this.totalStudents.filter((s: any) => s.courseId === course.id).length;

      total += (course.price || 0) * enrolledCount;
    }

    this.totalPrice = total;
  }
}
