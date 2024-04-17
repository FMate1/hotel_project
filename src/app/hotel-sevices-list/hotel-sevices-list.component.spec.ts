import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSevicesListComponent } from './hotel-sevices-list.component';

describe('HotelSevicesListComponent', () => {
  let component: HotelSevicesListComponent;
  let fixture: ComponentFixture<HotelSevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelSevicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelSevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
