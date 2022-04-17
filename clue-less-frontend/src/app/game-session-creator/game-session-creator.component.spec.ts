import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionCreatorComponent } from './game-session-creator.component';

describe('GameSessionCreatorComponent', () => {
  let component: GameSessionCreatorComponent;
  let fixture: ComponentFixture<GameSessionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSessionCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSessionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
