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
    suspect: ['', [Validators.required]],
    room: ['', [Validators.required]]
  })

  public imagePath: string = '../../assets';

  public clueMap: Array<Array<BoardLocation>> = [
    [
      {name: "Study", xCord: 0, yCord: 4, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Study.png`},
      {name: "Hallway#03", xCord: 0, yCord: 3, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Library", xCord: 0, yCord: 2, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Library.png`},
      {name: "Hallway#01", xCord: 0, yCord: 1, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Conservatory", xCord: 0, yCord: 0, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Conservatory.png`}
    ],
    [
      {name: "Hallway#41", xCord: 4, yCord: 1, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`},
      {name: "Wall", xCord: 3, yCord: 1, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Wall.png`},
      {name: "Hallway#21", xCord: 2, yCord: 1, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`},
      {name: "Wall", xCord: 1, yCord: 1, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Wall.png`},
      {name: "Hallway#10", xCord: 1, yCord: 0, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`}
    ],
    [
      {name: "Hall", xCord: 2, yCord: 4, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Hall.png`},
      {name: "Hallway#32", xCord: 3, yCord: 2, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Billiard Room", xCord: 2, yCord: 2, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Billiard Room.png`},
      {name: "Hallway#12", xCord: 1, yCord: 2, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Ballroom", xCord: 2, yCord: 0, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Ballroom.png`},
    ],
    [
      {name: "Hallway#43", xCord: 4, yCord: 3, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`},
      {name: "Wall", xCord: 3, yCord: 3, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Wall.png`},
      {name: "Hallway#23", xCord: 2, yCord: 3, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`},
      {name: "Wall", xCord: 1, yCord: 3, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Wall.png`},
      {name: "Hallway#30", xCord: 3, yCord: 0, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Horizontal Hallway.png`},
    ],
    [
      {name: "Lounge", xCord: 4, yCord: 4, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Lounge.png`},
      {name: "Hallway#34", xCord: 3, yCord: 4, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Dining Room", xCord: 4, yCord: 2, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Dining Room.png`},
      {name: "Hallway#14", xCord: 1, yCord: 4, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Vert Hallway.png`},
      {name: "Kitchen", xCord: 4, yCord: 0, occupancy: 0, playerOccupancy: [], playerOccupancyImg: "", image: `${this.imagePath}/Kitchen.png`}
    ]
  ]

  public allRooms: string[];
  public allWeapons: string[];
  allPlayers: string[] = [];

  selectedPlayer?: Player;
  isPlayersTurn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private messageService: MessageService) {

    this.allWeapons = [
      WeaponType.CANDLESTICK,
      WeaponType.KNIFE,
      WeaponType.LEAD_PIPE,
      WeaponType.REVOLVER,
      WeaponType.ROPE,
      WeaponType.WRENCH
    ]

    this.allRooms = [];
    this.clueMap.forEach(row => {
      row.forEach(roomItem => {
        const roomName: string = roomItem.name.toLowerCase();
        if (!roomName.includes('hallway') && !roomName.includes('wall')) {
          this.allRooms.push(roomItem.name);
        }
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

      // check if its current player's turn
      if (this.selectedPlayer != null) {
        this.selectedPlayer = this.gameState.playerList[this.selectedPlayer.name];
        this.selectedPlayer.availableMove = new Set(this.selectedPlayer.availableMove);
        this.isPlayersTurn = this.gameState.turn.playerQ[0] == this.selectedPlayer.name;
      }
      else {
        this.isPlayersTurn = false;
      }
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
        .subscribe(p => {
          this.selectedPlayer = p;
          this.selectedPlayer.availableMove = new Set(this.selectedPlayer.availableMove);
        });
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
        boardItem.playerOccupancy = [];
        boardItem.playerOccupancyImg = '';
      })
    })

    if (this.gameState == null)
      return;

    let playerKeys: string[];
    playerKeys = Object.keys(this.gameState.playerLocation);

    playerKeys.forEach(k => {
      let playerLoc: PlayerLocation = this.gameState!.playerLocation[k];

      if (playerLoc) {
        this.clueMap[playerLoc.x][playerLoc.y].playerOccupancy.push(k);
        this.clueMap[playerLoc.x][playerLoc.y].playerOccupancyImg =
          this.imagePath + '/'
          + k
            .replace(/\./g, '')
            .replace(/\s/, '-')
            .toLowerCase() + '.png';
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

  moveDiag() {
    this.playerMovement("diag")
  }


  /**
   * Action for player movement
   * @param action - desired movement
   */
  playerMovement(action: string) {
    if (this.selectedPlayer && this.gameState) {
      this.gameService.movePlayer(this.selectedPlayer.id, this.gameState.gameId, action)
        .subscribe((resp) => {
          this.messageService.add(JSON.stringify(resp));
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
    const suspect = this.suggestionSuspect?.value.match(regex)[2];
    const weapon = this.suggestionWeapon?.value.match(regex)[2];
    this.gameService.makeSuggestion(gameId, userId, suspect, weapon)
      .subscribe((resp) => {
        this.messageService.add(JSON.stringify(resp));
      });

  }

  /**
   * Method to make accusation
   */
  makeAccusation() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const userId = this.selectedPlayer?.id!;
    const regex = /([0-9]): ([a-zA-Z. ]+)/;
    const suspect = this.accusationSuspect?.value.match(regex)[2];
    const weapon = this.accusationWeapon?.value.match(regex)[2];
    const room = this.accusationRoom?.value.match(regex)[2];
    this.gameService.makeAccusation(gameId, userId, suspect, weapon, room)
      .subscribe((resp) => {
        this.messageService.add(JSON.stringify(resp));
      });
  }


  /**
   * Method to end current turn
   */
  endTurn() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const userId = this.selectedPlayer?.id!;

    this.gameService.endTurn(gameId, userId)
      .subscribe((resp) => {
        this.messageService.add(JSON.stringify(resp))
      });
  }

  /**
   * Disapprove a player's suggestion
   */
  disapproveSuggestion() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const userId = this.selectedPlayer?.id!;

    this.gameService.disapproveSuggestion(gameId, userId)
      .subscribe(resp => {
        this.messageService.add(JSON.stringify(resp));
      });
  }

  changeSuggestionWeapon(e: any) {
    this.suggestionWeapon?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  get suggestionWeapon() {
    return this.suggestionForm.get('weaponType');
  }

  changeSuggestionSuspect(e: any) {
    this.suggestionSuspect?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  get suggestionSuspect() {
    return this.suggestionForm.get('suspect');
  }

  changeAccusationRoom(e: any) {
    this.accusationRoom?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeAccusationWeapon(e: any) {
    this.accusationWeapon?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeAccusationSuspect(e: any) {
    this.accusationSuspect?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  get accusationWeapon() {
    return this.accusationForm.get('weaponType');
  }

  get accusationSuspect() {
    return this.accusationForm.get('suspect');
  }

  get accusationRoom() {
    return this.accusationForm.get('room');
  }


}
