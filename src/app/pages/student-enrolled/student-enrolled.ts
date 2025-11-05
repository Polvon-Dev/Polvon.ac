import { Courses } from './../courses/courses';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentEnrolledService } from './student-enrolled-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-enrolled',
  imports: [CommonModule],
  templateUrl: './student-enrolled.html',
  styleUrl: './student-enrolled.css',
})
export class StudentEnrolled implements OnInit {
  courses: any[] = [];
  students: any[] = [];
  teacherCourses: any[] = [];
  studentId: any;
  teacherId!: number;
  courseId!: any;
  enrollments: any[] = [];
  enrollmentsData: any[] = [];
  constructor(private enrolledService: StudentEnrolledService, private http: HttpClient) {}

  ngOnInit(): void {
    this.teacherId = this.enrolledService.teacherId;

    this.getCourses();
  }

  getCourses() {
    this.http.get<any>(`http://localhost:3000/courses?teacherId=${this.teacherId}`).subscribe({
      next: (data: any) => {
        this.courses = data;
        this.getEnrollmentsByCourses(this.courses);
      },
    });
  }
  getEnrollmentsByCourses(courses: any[]) {
    const coursIds = courses.map((c) => c.id);
    const query = coursIds.map((id) => `courseId=${id}`).join('&');
    this.http.get(`http://localhost:3000/studentEnrollments?${query}`).subscribe({
      next: (enrollments: any) => {
        this.enrollments = enrollments;
        const studentIds = enrollments.map((e: any) => e.studentId);
        if (studentIds.length > 0) {
          this.getStudents(studentIds);
        }
      },
    });
  }

  getStudents(studentIds: string[]) {
    const query = studentIds.map((id) => `id=${id}`).join('&');
    this.http.get(`http://localhost:3000/users?${query}`).subscribe((students: any) => {
      this.students = students;
    });
  }
  getCourseTitle(courseId: string) {
    const course = this.courses.find((c) => c.id === courseId);
    return course ? course.title : '';
  }
}
