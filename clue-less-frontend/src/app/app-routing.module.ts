import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { GameSessionComponent } from './game-session/game-session.component';
import {GameSessionCreatorComponent} from "./game-session-creator/game-session-creator.component";
import {JoinExistingGameComponent} from "./join-existing-game/join-existing-game.component";

const routes: Routes = [
  { path: '', redirectTo: '/banner', pathMatch: 'full'},
  { path: 'banner', component: BannerComponent },
  { path: 'game-session/:id', component: GameSessionComponent },
  { path: 'game-session-creator', component: GameSessionCreatorComponent },
  { path: 'join-existing-game', component: JoinExistingGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
