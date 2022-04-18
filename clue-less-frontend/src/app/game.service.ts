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
  private createGameApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.createGameApiUrl}`;
  private exitGameApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.exitGameApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Request to see the lobby of the game session (assuming game hasn't been started yet)
   * @param gameId - ID of the game session
   */
  getLobby(gameId: number): Observable<Lobby> {
    this.log("Sending request to fetch lobby info");
    const lobbyApiUrl = `${this.lobbyApiUrl}?gameId=${gameId}`
    return this.http.get<Lobby>(lobbyApiUrl)
      .pipe(
        tap(lobby => {
          this.log(`fetched lobby info: ${lobby.id}`);
          lobby.players.forEach( (player) => this.log(`player id=${player.id}, name=${player.name}, available=${player.available}`));
        }),
        catchError(this.handleError<Lobby>('getLobby'))
      );
  }

  /**
   * Request to select a player for a given game session
   * @param player - Player character selected by user
   * @param gameId - ID of the game session
   */
  selectPlayer(player: Player, gameId: number): Observable<Player> {
    const selectPlayerUrl = `${this.selectPlayerApiUrl}?gameId=${gameId}`;
    return this.http.post<Player>(selectPlayerUrl, player, this.httpOptions).pipe(
      tap((selectedPlayer: Player) => this.log(`Selected player w/ id=${selectedPlayer.id}`)),
      catchError(this.handleError<Player>('selectPlayer'))
    );
  }


  /**
   * Sends request to create a game session
   *
   * @param gameSessionData - Game session settings (name, player count etc)
   */
  createSession(gameSessionData: FormData): Observable<any> {
    const startGameUrl = `${this.createGameApiUrl}`;
    this.log("Sending request to start game session");
    return this.http.post<Game>(startGameUrl, gameSessionData, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Created Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('createSession'))
    );
  }

  /**
   * Method to exit game session
   * @param playerId - Player exiting game session
   * @param gameId - game session ID
   */
  exitGame(playerId: number, gameId: number): Observable<any> {
    const exitGameUrl = `${this.exitGameApiUrl}?userId=${playerId}&gameName=${gameId}`;
    this.log(`Sending request to exit game at url: ${exitGameUrl}`);

    return this.http.post<Game>(exitGameUrl, playerId, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Exiting Game session w/ name=${game.gameName}`)),
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
