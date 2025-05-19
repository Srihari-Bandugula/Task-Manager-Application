import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusTabComponent } from './task-status-tab.component';

describe('TaskStatusTabComponent', () => {
  let component: TaskStatusTabComponent;
  let fixture: ComponentFixture<TaskStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
