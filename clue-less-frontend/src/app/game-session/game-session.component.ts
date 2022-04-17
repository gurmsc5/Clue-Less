import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Lobby } from '../lobby';
import { MessageService } from '../message.service';
import { Player } from '../player';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  lobby: Lobby | undefined;
  selectedPlayer?: Player;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getGameSession();
  }

  getGameSession(): void {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gameService.getLobby(gameId)
     .subscribe(l => this.lobby = l);
  }

  exitGame(): void {
    if (this.selectedPlayer && this.lobby) {
      this.gameService.exitGame(this.selectedPlayer.id, this.lobby.id)
        .subscribe(g => this.messageService.add(`Exited game session: ${g.gameId}`));
    }
    else {
      this.messageService.add("Unable to exit game: Character selection wasn't confirmed!")
    }
  }

  onSelect(player: Player): void {
    if (this.lobby) {
      this.gameService.selectPlayer(player, this.lobby.id)
        .subscribe(p => this.selectedPlayer = p);
    }
  }

  startSession(): void {

  }
}
