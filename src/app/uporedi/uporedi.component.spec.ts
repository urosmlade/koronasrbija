import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UporediComponent } from './uporedi.component';

describe('UporediComponent', () => {
  let component: UporediComponent;
  let fixture: ComponentFixture<UporediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UporediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UporediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
