import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-courses',
  imports: [FormsModule],
  templateUrl: './add-courses.html',
  styleUrl: './add-courses.css',
})
export class AddCourses implements OnInit {
  user: any = {};

  course = {
    title: '',
    description: '',
    thumbnail: '',
    price: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  AddCourses() {
    if (!this.user?.teacherId) {
      alert('Foydalanuvchi topilmadi!');
      return;
    }

    const newCourse = {
      teacherId: Number(this.user.teacherId),
      teacherName: `${this.user.firstName} ${this.user.lastName}`,
      title: this.course.title,
      description: this.course.description,
      thumbnail: this.course.thumbnail,
      price: this.course.price,
      studentsEnrolled: 0,
      publishedDate: new Date().toISOString().split('T')[0],
    };

    this.http.post<any>('http://localhost:3000/courses', newCourse).subscribe({
      next: () => {
        alert('Kurs muvaffaqiyatli qo‘shildi!');
        this.router.navigate(['/myCourses']);
        this.course = { title: '', description: '', thumbnail: '', price: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Xatolik yuz berdi, qayta urinib ko‘ring.');
      },
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('signUpUsers');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (Array.isArray(parsed)) {
        const teacher = parsed.find((u: any) => u.role === 'teacher');
        this.user = teacher || parsed[0];
      } else {
        this.user = parsed;
      }
    }
  }
}
