import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {GameService} from "../game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join-existing-game',
  templateUrl: './join-existing-game.component.html',
  styleUrls: ['./join-existing-game.component.css']
})
export class JoinExistingGameComponent implements OnInit {

  gameSessionForm = this.fb.group({
    id: [999, [Validators.required, Validators.min(1), Validators.max(999)]]
  })

  constructor(private fb: FormBuilder,
              private location: Location,
              private router: Router,
              private gameService: GameService) { }

  ngOnInit(): void {
  }

  joinGameSession(): void {
    const gameId = this.gameSessionForm.get('id')?.value;
    this.gameService.getLobby(gameId)
      .subscribe( l => {
        this.router.navigate([`/game-session/${l.id}`])
      })
  }

  goBack(): void {
    this.location.back();
  }
}
