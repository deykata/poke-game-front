import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VArenaComponent } from './v-arena.component';

describe('VArenaComponent', () => {
  let component: VArenaComponent;
  let fixture: ComponentFixture<VArenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VArenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
