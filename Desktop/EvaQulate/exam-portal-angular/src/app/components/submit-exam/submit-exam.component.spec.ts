import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExamComponent } from './submit-exam.component';

describe('SubmitExamComponent', () => {
  let component: SubmitExamComponent;
  let fixture: ComponentFixture<SubmitExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
