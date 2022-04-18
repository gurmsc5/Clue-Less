import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Lobby } from '../lobby';
import { MessageService } from '../message.service';
import { Player } from '../player';
import {ActivatedRoute, Router} from "@angular/router";
import {BoardLocation} from "../boardLocation";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  lobby: Lobby | undefined;
  gameState: Game | undefined;
  clueMap?: BoardLocation[];
  selectedPlayer?: Player;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getGameSession();
  }

  getGameSession(): void {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gameService.getLobby(gameId)
     .subscribe(l => this.lobby = l);

    this.gameService.getGameStatus(gameId)
      .subscribe(g => {
        this.gameState = g;
        if (this.gameState.Map){
          const keys: string[] = Object.keys(this.gameState.Map.mainMap)
          const sortedLocations = keys.sort();
          this.clueMap = [];
          sortedLocations.forEach(loc => {
            let boardLoc: BoardLocation = this.gameState?.Map?.mainMap[loc]!;
            this.clueMap?.push(boardLoc);
          })
        }
      });
  }

  exitGame(): void {
    if (this.selectedPlayer && this.lobby) {
      this.gameService.exitGame(this.selectedPlayer.id, this.lobby.id)
        .subscribe(() => { this.router.navigate(["/banner"])});
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
    if (this.gameState) {
      this.gameService.startGame(this.gameState.gameId)
        .subscribe(g => {
          this.gameState = g;
          this.lobby = undefined;
        });
    }
  }
}
