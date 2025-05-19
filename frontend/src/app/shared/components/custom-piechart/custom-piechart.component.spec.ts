import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPiechartComponent } from './custom-piechart.component';

describe('CustomPiechartComponent', () => {
  let component: CustomPiechartComponent;
  let fixture: ComponentFixture<CustomPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPiechartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
