import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VNotFoundComponent } from './v-not-found.component';

describe('VNotFoundComponent', () => {
  let component: VNotFoundComponent;
  let fixture: ComponentFixture<VNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
