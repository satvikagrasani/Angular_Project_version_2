import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpactionComponent } from './empaction.component';

describe('EmpactionComponent', () => {
  let component: EmpactionComponent;
  let fixture: ComponentFixture<EmpactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpactionComponent]
    });
    fixture = TestBed.createComponent(EmpactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
