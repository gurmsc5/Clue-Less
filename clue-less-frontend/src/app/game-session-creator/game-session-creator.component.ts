import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {GameService} from "../game.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-session-creator',
  templateUrl: './game-session-creator.component.html',
  styleUrls: ['./game-session-creator.component.css']
})
export class GameSessionCreatorComponent implements OnInit {
  gameSessionForm = this.fb.group({
    id: ['', Validators.required],
    playerCount: [2, [Validators.required, Validators.min(2), Validators.max(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private location: Location,
              private gameService: GameService)
  { }

  ngOnInit(): void {
  }

  createGameSession() {
    this.gameService.createSession(this.gameSessionForm)
      .subscribe(g => {
        this.router.navigate([`/game-session/${g.gameId}`])
      });
  }

  goBack(): void {
    this.location.back();
  }

}
