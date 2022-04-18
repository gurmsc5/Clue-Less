import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-gameboard',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {


  constructor(
    private gameService: GameService){
  }

  ngOnInit(): void {
    this.initializeBoard()
  }

  initializeBoard(): void {

  }

}
