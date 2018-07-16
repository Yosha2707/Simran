import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombobasketComponent } from './combobasket.component';

describe('CombobasketComponent', () => {
  let component: CombobasketComponent;
  let fixture: ComponentFixture<CombobasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombobasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombobasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
