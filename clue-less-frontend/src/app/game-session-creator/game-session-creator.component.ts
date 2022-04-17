import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {GameService} from "../game.service";
import {Game} from "../game";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-game-session-creator',
  templateUrl: './game-session-creator.component.html',
  styleUrls: ['./game-session-creator.component.css']
})
export class GameSessionCreatorComponent implements OnInit {
  gameSessionForm = this.fb.group({
    name: ['', Validators.required],
    playerCount: [2, [Validators.required, Validators.min(2), Validators.max(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private gameService: GameService,
              private messageService: MessageService)
  { }

  ngOnInit(): void {
  }

  createGameSession() {
    this.gameService.createSession(this.gameSessionForm.value)
      .subscribe(g => {
        this.router.navigate([`/game-session/${g.gameId}`])
      });
  }

}
