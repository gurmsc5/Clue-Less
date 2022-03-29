import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Lobby } from '../lobby';
import { MessageService } from '../message.service';
import { Player } from '../player';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  lobby$!: Observable<Lobby>;
  selectedPlayer?: Player;
  game?: Game;

  constructor(
    private gameService: GameService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.lobby$ = this.gameService.getLobby();

  }

  exitGame(): void {
    if (this.selectedPlayer) {
      this.gameService.exitGame(this.selectedPlayer.id)
        .subscribe(g => this.game = g);
    }
    else {
      this.messageService.add("Unable to exit game: Character selection wasn't confirmed!")
    }

    this.location.back();
  }

  onSelect(player: Player): void {
    this.gameService.selectPlayer(player)
      .subscribe(p => this.selectedPlayer = p);
  }

  startSession(): void {
    if (this.selectedPlayer) {
      this.gameService.startSession(this.selectedPlayer.id)
        .subscribe(g => this.game = g);
    }
    else {
      this.messageService.add("Unable to start game: Character selection wasn't confirmed!")
    }
  }

}
