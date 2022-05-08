import {Component, OnInit} from '@angular/core';
import {Game} from '../game';
import {GameService} from '../game.service';
import {Lobby} from '../lobby';
import {MessageService} from '../message.service';
import {Player, PlayerLocation} from '../player';
import {ActivatedRoute, Router} from "@angular/router";
import {BoardLocation} from "../boardLocation";
import {WeaponType} from "../weapon-type";
import {FormBuilder, Validators} from "@angular/forms";
import {PLAYERS} from "../mock-players";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  lobby: Lobby | undefined;
  gameState: Game | undefined;

  suggestionForm = this.fb.group({
    weaponType: ['', [Validators.required]],
    suspect: ['', [Validators.required]]
  })

  accusationForm = this.fb.group({
    weaponType: ['', [Validators.required]],
    suspect: ['', [Validators.required]]
  })

  public clueMap: Array<Array<BoardLocation>> = [
    [{name: "Conservatory", xCord: 0, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#10", xCord: 1, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Ballroom", xCord: 2, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#30", xCord: 3, yCord: 0, occupancy: 0, playerOccupancy: ""},
      {name: "Kitchen", xCord: 4, yCord: 0, occupancy: 0, playerOccupancy: ""}],
    [{name: "Hallway#01", xCord: 0, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Wall", xCord: 1, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#21", xCord: 2, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Wall", xCord: 3, yCord: 1, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#41", xCord: 4, yCord: 1, occupancy: 0, playerOccupancy: ""}],
    [{name: "Library", xCord: 0, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#12", xCord: 1, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Billiard Room", xCord: 2, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#32", xCord: 3, yCord: 2, occupancy: 0, playerOccupancy: ""},
      {name: "Dining Room", xCord: 4, yCord: 2, occupancy: 0, playerOccupancy: ""}],
    [{name: "Hallway#03", xCord: 0, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Wall", xCord: 1, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#23", xCord: 2, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Wall", xCord: 3, yCord: 3, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#43", xCord: 4, yCord: 3, occupancy: 0, playerOccupancy: ""}],
    [{name: "Study", xCord: 0, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#14", xCord: 1, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hall", xCord: 2, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Hallway#34", xCord: 3, yCord: 4, occupancy: 0, playerOccupancy: ""},
      {name: "Lounge", xCord: 4, yCord: 4, occupancy: 0, playerOccupancy: ""}]
  ]

  public allRooms: string[];
  public allWeapons: string[];
  allPlayers: string[] = [];

  selectedPlayer?: Player;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private messageService: MessageService) {

    this.allWeapons = [
      WeaponType[WeaponType.CANDLESTICK],
      WeaponType[WeaponType.DAGGER],
      WeaponType[WeaponType.LEAD_PIPE],
      WeaponType[WeaponType.REVOLVER],
      WeaponType[WeaponType.ROPE],
      WeaponType[WeaponType.WRENCH]
    ]

    this.allRooms = [];
    this.clueMap.forEach(row => {
      row.forEach(roomItem => {
        this.allRooms.push(roomItem.name);
      })
    })
  }

  ngOnInit(): void {
    this.getGameSession();
    this.getUpdatedGameStatus();
  }


  getUpdatedGameStatus() {
    this.gameService.getUpdatedGameStatus().subscribe(resp => {
      if (typeof resp === "string"){
        this.gameState = JSON.parse(resp) as Game;
      }
      else {
        this.gameState = resp as Game;
      }

      this.allPlayers = Object.keys(this.gameState.playerList);
      this.resetPlayerOccupancy();
    })
  }

  /**
   * Fetch game session information for gameId
   */
  getGameSession(): void {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gameService.getLobby(gameId)
     .subscribe(l => this.lobby = l);
  }

  /**
   * Method to exit game session
   */
  exitGame(): void {
    if (this.selectedPlayer && this.gameState) {
      this.gameService.exitGame(this.selectedPlayer.id, this.gameState.gameId)
        .subscribe(() => { this.router.navigate(["/banner"])});
    }
    else {
      this.messageService.add("Unable to exit game: Character selection wasn't confirmed!")
    }
  }

  /**
   * Method to select a player from lobby
   * @param player - selected player
   */
  onSelect(player: Player): void {
    if (this.lobby) {
      this.gameService.selectPlayer(player, this.lobby.id)
        .subscribe(p => this.selectedPlayer = p);
    }
  }

  /**
   * Start game session method
   */
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

    if (this.gameState == null)
      return;

    let playerKeys: string[];
    playerKeys = Object.keys(this.gameState.playerLocation);
    playerKeys.forEach(k => {
      let playerLoc: PlayerLocation = this.gameState.playerLocation[k];

      if (playerLoc) {
        this.clueMap[playerLoc.x][playerLoc.y].playerOccupancy = k;
      }
    })
  }

  moveLeft(): void {
    this.playerMovement("left")
  }

  moveRight() {
    this.playerMovement("right")
  }

  moveUp() {
    this.playerMovement("up")
  }

  moveDown() {
    this.playerMovement("down")
  }

  /**
   * Action for player movement
   * @param action - desired movement
   */
  playerMovement(action: string) {
    if (this.selectedPlayer && this.gameState) {
      this.gameService.movePlayer(this.selectedPlayer.id, this.gameState.gameId, action)
        .subscribe((resp) => {
          console.log(resp);
        })
    }
  }


  /**
   * Method to make suggestion
   */
  makeSuggestion() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const userId = this.selectedPlayer?.id!;
    const regex = /([0-9]): ([a-zA-Z. ]+)/;
    const suspect = this.suggestionSuspect.value.match(regex)[2];
    const weapon = this.suggestionWeapon.value.match(regex)[2];
    this.gameService.makeSuggestion(gameId, userId, suspect, weapon)
      .subscribe((resp) => {
        console.log(resp);
      });

  }


  changeSuggestionWeapon(e: any) {
    this.suggestionWeapon?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get suggestionWeapon() {
    return this.suggestionForm.get('weaponType');
  }

  changeSuggestionSuspect(e: any) {
    this.suggestionSuspect?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get suggestionSuspect() {
    return this.suggestionForm.get('suspect');
  }

}
