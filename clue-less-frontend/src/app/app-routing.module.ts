import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { GameSessionComponent } from './game-session/game-session.component';

const routes: Routes = [
  { path: '', redirectTo: '/banner', pathMatch: 'full'},
  { path: 'banner', component: BannerComponent },
  { path: 'game-session', component: GameSessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
