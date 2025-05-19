import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertforDeleteComponent } from './alertfor-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AlertforDeleteComponent', () => {
  let component: AlertforDeleteComponent;
  let fixture: ComponentFixture<AlertforDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertforDeleteComponent, HttpClientTestingModule], // standalone component + HttpClientTestingModule
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'yourTestId'
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertforDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input content', () => {
    const testContent = 'Are you sure you want to delete this item?';
    component.content = testContent;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(testContent);
  });

  it('should emit onDelete event when handleDelete is called', () => {
    spyOn(component.onDelete, 'emit');

    component.handleDelete();

    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
