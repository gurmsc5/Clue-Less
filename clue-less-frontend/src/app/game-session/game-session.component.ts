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

  public clueMap: Array<Array<BoardLocation>> = [
    [{name: "Conservatory", xCord: 0, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#10", xCord: 1, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Ballroom", xCord: 2, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#30", xCord: 3, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Kitchen", xCord: 4, yCord: 0, occupancy: 0, playerOccupancy: ""}],
    [{name: "Hallway#01", xCord: 0, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "NotAvailable", xCord: 1, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#21", xCord: 2, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "NotAvailable", xCord: 3, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#41", xCord: 4, yCord: 1, occupancy: 0, playerOccupancy: ""}],
    [{name: "Library", xCord: 0, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#12", xCord: 1, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Billiard Room", xCord: 2, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#32", xCord: 3, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Dining Room", xCord: 4, yCord: 2, occupancy: 0, playerOccupancy: ""}],
    [{name: "Hallway#03", xCord: 0, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "NotAvailable", xCord: 1, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#23", xCord: 2, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "NotAvailable", xCord: 3, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#43", xCord: 4, yCord: 3, occupancy: 0, playerOccupancy: ""}],
    [{name: "Study", xCord: 0, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#14", xCord: 1, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hall", xCord: 2, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#34", xCord: 3, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Lounge", xCord: 4, yCord: 4, occupancy: 0, playerOccupancy: ""}]
  ]

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

        this.resetPlayerOccupancy();
        this.gameState.playerLocation.forEach(item => {
          this.messageService.add(`${item.name} -> (${item.xCoord}, ${item.yCoord})`)
          this.clueMap[item.xCoord][item.yCoord].playerOccupancy = item.name;
        })

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

  /**
   * clear out all player occupancy
   */
  resetPlayerOccupancy(): void {

    this.clueMap.forEach(row => {
      row.forEach(boardItem => {
        boardItem.playerOccupancy = '';
      })
    })
  }
}
