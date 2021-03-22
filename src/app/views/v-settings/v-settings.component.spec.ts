import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSettingsComponent } from './v-settings.component';

describe('VSettingsComponent', () => {
  let component: VSettingsComponent;
  let fixture: ComponentFixture<VSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
