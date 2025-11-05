import { Courses } from './../courses/courses';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentEnrolledService } from './student-enrolled-service';

@Component({
  selector: 'app-student-enrolled',
  imports: [],
  templateUrl: './student-enrolled.html',
  styleUrl: './student-enrolled.css',
})
export class StudentEnrolled implements OnInit {
  courses: any[] = [];
  teacherCourses: any[] = [];
  teacherId!: number;
  courseId!: string;
  constructor(private enrolledService: StudentEnrolledService, private http: HttpClient) {}

  ngOnInit(): void {
    this.teacherId = this.enrolledService.teacherId;

    this.getCourses();
  }

  getCourses() {
    this.http.get<any>(`http://localhost:3000/courses?teacherId=${this.teacherId}`).subscribe({
      next: (data: any) => {
        this.courses = data;
        this.teacherCourses = this.courses.filter((t) => t.teacherId == this.teacherId);
        console.log(this.teacherCourses);

        // this.courseId = this.teacherCourses.filter((d)=>d.id==)
      },
    });
  }
}
