import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExistingGameComponent } from './join-existing-game.component';

describe('JoinExistingGameComponent', () => {
  let component: JoinExistingGameComponent;
  let fixture: ComponentFixture<JoinExistingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinExistingGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinExistingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
