import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BannerComponent } from './banner/banner.component';
import { MessagesComponent } from './messages/messages.component';
import { GameSessionComponent } from './game-session/game-session.component';
import { environment } from 'src/environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { httpInterceptorProviders } from './http-interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from "@angular/forms";
import { GameSessionCreatorComponent } from './game-session-creator/game-session-creator.component';
import { JoinExistingGameComponent } from './join-existing-game/join-existing-game.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MessagesComponent,
    GameSessionComponent,
    GameSessionCreatorComponent,
    JoinExistingGameComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        environment.enableInterceptors ? HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {dataEncapsulation: false}
        ) : [],
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        ReactiveFormsModule,
    ],
  providers: [
    environment.enableInterceptors ? httpInterceptorProviders : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
