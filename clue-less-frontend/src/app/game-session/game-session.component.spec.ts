import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from '../game.service';

import { GameSessionComponent } from './game-session.component';

describe('GameSessionComponent', () => {
  let component: GameSessionComponent;
  let fixture: ComponentFixture<GameSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSessionComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ GameService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
