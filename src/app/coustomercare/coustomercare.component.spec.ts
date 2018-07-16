import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomercareComponent } from './coustomercare.component';

describe('CoustomercareComponent', () => {
  let component: CoustomercareComponent;
  let fixture: ComponentFixture<CoustomercareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoustomercareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomercareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
