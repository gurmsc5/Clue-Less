import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private gameService: GameService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.lobby$ = this.gameService.getLobby();

  }

  exitGame(): void {
    this.gameService.exitGame();
    this.location.back();
  }

  onSelect(player: Player): void {
    this.gameService.selectPlayer(player)
      .subscribe(p => this.selectedPlayer = player);
  }

  startSession(): void {
    if (this.selectedPlayer) {
      this.gameService.startSession(this.selectedPlayer.id);
    }
    else {
      this.messageService.add("Unable to start game: Character selection wasn't confirmed!")
    }
  }
}
