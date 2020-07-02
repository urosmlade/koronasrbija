import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljnijeComponent } from './detaljnije.component';

describe('DetaljnijeComponent', () => {
  let component: DetaljnijeComponent;
  let fixture: ComponentFixture<DetaljnijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaljnijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljnijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
