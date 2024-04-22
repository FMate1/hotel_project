import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRoomComponent } from './family-room.component';

describe('FamilyRoomComponent', () => {
  let component: FamilyRoomComponent;
  let fixture: ComponentFixture<FamilyRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
