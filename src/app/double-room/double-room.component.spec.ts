import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleRoomComponent } from './double-room.component';

describe('DoubleRoomComponent', () => {
  let component: DoubleRoomComponent;
  let fixture: ComponentFixture<DoubleRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
