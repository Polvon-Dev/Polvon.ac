import { Courses } from '../../courses/courses';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentEnrolledService } from './student-enrolled-service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-student-enrolled',
  imports: [CommonModule],
  templateUrl: './student-enrolled.html',
  styleUrl: './student-enrolled.css',
  standalone: true,
})
export class StudentEnrolled implements OnInit {
  teacherId!: number;
  constructor(public enrolledService: StudentEnrolledService, private http: HttpClient) {}

  ngOnInit(): void {
    this.teacherId = this.enrolledService.teacherId;

    this.enrolledService.getCourses();
  }
}
