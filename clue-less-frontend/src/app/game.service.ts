import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retry } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lobby } from './lobby';

import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { Player } from './player';
import { Game } from './game';

const env = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private selectPlayerApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.selectPlayerApiUrl}`;
  private lobbyApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.lobbyApiUrl}`;
  private startGameApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.startGameApiUrl}`;
  private exitGameApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.exitGameApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getLobby(): Observable<Lobby> {
    this.log("Sending request to fetch lobby info");

    return this.http.get<Lobby>(this.lobbyApiUrl)
      .pipe(
        tap(lobby => {
          this.log(`fetched lobby info: ${lobby.id}`);
          lobby.players.forEach( (player) => this.log(`player id=${player.id}, name=${player.name}, available=${player.available}`));
        }),
        catchError(this.handleError<Lobby>('getLobby'))
      );
  }

  selectPlayer(player: Player): Observable<Player> {
    const selectPlayerUrl = `${this.selectPlayerApiUrl}?userId=${player.id}&character=${player.name}`;
    return this.http.post<Player>(selectPlayerUrl, player, this.httpOptions).pipe(
      tap((selectedPlayer: Player) => this.log(`Selected player w/ id=${selectedPlayer.id}`)),
      catchError(this.handleError<Player>('selectPlayer'))
    );
  }

  startSession(playerId: number): Observable<any> {
    const startGameUrl = `${this.startGameApiUrl}?userCount=4&size=6&gameId=999`;
    this.log("Sending request to start game session");
    return this.http.post<Game>(startGameUrl, playerId, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Started Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('startGame'))
    );
  }

  exitGame(playerId:number, gameId:number): Observable<any> {
    const exitGameUrl = `${this.exitGameApiUrl}/${gameId}?userId=${playerId}`;
    this.log(`Exiting game w/id=${gameId}`);
    return this.http.post<Game>(exitGameUrl, playerId, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Exiting Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('exitGame'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    private log(message: string) {
      this.messageService.add(`GameService: ${message}`);
    }
}
