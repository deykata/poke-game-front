import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleResultComponent } from './battle-result.component';

describe('BattleResultComponent', () => {
  let component: BattleResultComponent;
  let fixture: ComponentFixture<BattleResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
