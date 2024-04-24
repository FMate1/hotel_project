import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsActivitiesComponent } from './attractions-activities.component';

describe('AttractionsActivitiesComponent', () => {
  let component: AttractionsActivitiesComponent;
  let fixture: ComponentFixture<AttractionsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionsActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
