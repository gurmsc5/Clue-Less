import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
  }

  startSession(): void {
    this.connectionService.startSession();
  }
}
