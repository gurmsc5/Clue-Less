import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Lobby } from '../lobby';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  lobby: Lobby | undefined;

  constructor(
    private router: Router,
    private gameService: GameService) { }

  ngOnInit(): void {
  }
}
