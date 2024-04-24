import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServicesFormComponent } from './hotel-services-form.component';

describe('HotelServicesFormComponent', () => {
  let component: HotelServicesFormComponent;
  let fixture: ComponentFixture<HotelServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelServicesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
