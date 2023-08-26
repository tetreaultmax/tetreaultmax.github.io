import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicDialogComponent } from './tic-dialog.component';

describe('TicDialogComponent', () => {
  let component: TicDialogComponent;
  let fixture: ComponentFixture<TicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
