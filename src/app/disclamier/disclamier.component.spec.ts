import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclamierComponent } from './disclamier.component';

describe('DisclamierComponent', () => {
  let component: DisclamierComponent;
  let fixture: ComponentFixture<DisclamierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclamierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclamierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
