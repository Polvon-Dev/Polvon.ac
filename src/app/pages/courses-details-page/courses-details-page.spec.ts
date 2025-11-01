import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDetailsPage } from './courses-details-page';

describe('CoursesDetailsPage', () => {
  let component: CoursesDetailsPage;
  let fixture: ComponentFixture<CoursesDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
