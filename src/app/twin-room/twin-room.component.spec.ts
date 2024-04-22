import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinRoomComponent } from './twin-room.component';

describe('TwinRoomComponent', () => {
  let component: TwinRoomComponent;
  let fixture: ComponentFixture<TwinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwinRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
