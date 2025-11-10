import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentEnrolledService {
  private studentsSubject = new BehaviorSubject<any[]>([]);
  students$ = this.studentsSubject.asObservable();
  teacherCourses: any[] = [];
  students: any[] = [];
  courses: any[] = [];
  user: any;
  enrollments: any[] = [];
  teacherId!: number;
  constructor(private http: HttpClient) {
    this.loadUser();
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
        this.studentsSubject.next(enrollments);
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

  loadUser() {
    const parsed = localStorage.getItem('signUpUsers');
    if (parsed) {
      const users = JSON.parse(parsed);
      this.user = Array.isArray(users) ? users[users.length - 1] : users;
      this.teacherId = Number(this.user.teacherId);
    }
  }
}
