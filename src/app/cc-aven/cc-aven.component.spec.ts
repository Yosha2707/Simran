import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcAvenComponent } from './cc-aven.component';

describe('CcAvenComponent', () => {
  let component: CcAvenComponent;
  let fixture: ComponentFixture<CcAvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcAvenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcAvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
