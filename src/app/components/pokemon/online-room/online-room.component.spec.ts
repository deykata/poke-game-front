import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRoomComponent } from './online-room.component';

describe('OnlineRoomComponent', () => {
  let component: OnlineRoomComponent;
  let fixture: ComponentFixture<OnlineRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
