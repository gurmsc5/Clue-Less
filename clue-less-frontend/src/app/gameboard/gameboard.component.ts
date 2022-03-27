import { Component } from '@angular/core';



@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent {
  boardImage: string = "assets/boardImage.png";
  constructor(){}
}
