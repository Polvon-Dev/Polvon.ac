import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSkeletonLoaderModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Polvon-ac');
}
