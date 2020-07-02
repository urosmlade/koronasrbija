import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrbijaComponent } from './srbija.component';

describe('SrbijaComponent', () => {
  let component: SrbijaComponent;
  let fixture: ComponentFixture<SrbijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrbijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrbijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
