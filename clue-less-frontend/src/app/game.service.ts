import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retry } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lobby } from './lobby';

import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { Player } from './player';
import { Game } from './game';
import {FormGroup} from "@angular/forms";

const env = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}`;
  private selectPlayerApiUrl = `${this.baseApiUrl}/${env.selectPlayerApiUrl}`;
  private lobbyApiUrl = `${this.baseApiUrl}/${env.lobbyApiUrl}`;
  private createGameApiUrl = `${this.baseApiUrl}/${env.createGameApiUrl}`;
  private exitGameApiUrl = `${this.baseApiUrl}/${env.exitGameApiUrl}`;
  private startGameApiUrl = `${this.baseApiUrl}/${env.startGameApiUrl}`;
  private gameStatusApiUrl = `${this.baseApiUrl}/${env.gameStatusApiUrl}`;
  private playGameApiUrl = `${this.baseApiUrl}/${env.playGameApiUrl}`;


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
    const lobbyApiUrl = `${this.lobbyApiUrl}/${gameId}`
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
   * Get game status information
   * @param gameId - game to get status information for
   */
  getGameStatus(gameId: number): Observable<Game> {
    this.log("Sending request to fetch game status info");
    const gameStatusUrl = `${this.gameStatusApiUrl}/${gameId}`;
    return this.http.get<Game>(gameStatusUrl).pipe(
      tap(game => {
        this.log(`fetched game status info: ${game.gameId}`);
      }),
      catchError(this.handleError<Game>('getGameStatus'))
    );
  }

  /**
   * Request to select a player for a given game session
   * @param player - Player character selected by user
   * @param gameId - ID of the game session
   */
  selectPlayer(player: Player, gameId: number): Observable<Player> {
    const selectPlayerUrl = `${this.selectPlayerApiUrl}/${gameId}?userId=${player.id}&character=${player.name}`;
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
  createSession(gameSessionData: FormGroup): Observable<Game> {
    const userCount = gameSessionData.get('playerCount')?.value;
    const gameId = gameSessionData.get('playerId')?.value;

    const startGameUrl = `${this.createGameApiUrl}?userCount=${userCount}&size=6&gameId=${gameId}`;
    this.log("Sending request to start game session");
    return this.http.post<Game>(startGameUrl, gameSessionData, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Created Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('createSession'))
    );
  }

  /**
   * Method to start game session
   * @param gameId - game session ID
   */
  startGame(gameId: number): Observable<Game> {
    const startGameUrl = `${this.startGameApiUrl}?gameId=${gameId}`;
    this.log(`Sending request to start game w\ id: ${gameId}`);

    return this.http.post<Game>(startGameUrl, gameId, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Staring Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('startGame'))
    );
  }

  /**
   * Method to exit game session
   * @param playerId - Player exiting game session
   * @param gameId - game session ID
   */
  exitGame(playerId: number, gameId: number): Observable<any> {
    const exitGameUrl = `${this.exitGameApiUrl}/${gameId}?userId=${playerId}`;

    return this.http.post<Game>(exitGameUrl, playerId, this.httpOptions).pipe(
      tap((game: Game) => this.log(`Exiting Game session w/ id=${game.gameId}`)),
      catchError(this.handleError<Game>('exitGame'))
    );
  }

  /**
   * Method to send request for player movement
   * @param userId - player ID
   * @param gameId - game session ID
   * @param action - movement requested
   */
  movePlayer(userId: number, gameId: number, action: string): Observable<any> {
    const movePlayerUrl = `${this.playGameApiUrl}/${gameId}/move?userId=${userId}&action=${action}`;

    return this.http.post<any>(movePlayerUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player movement request completed successfully for player w/ id=${userId}`)),
      catchError(this.handleError<any>('movePlayer'))
    )

  }


  makeSuggestion(gameId: number, userId: number, suspect: string, weapon: string) {
    const suggestionUrl = `${this.playGameApiUrl}/${gameId}/suggestion?userId=${userId}&suspect=${suspect}&weapon=${weapon}`;

    return this.http.post<any>(suggestionUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player w/ id =  w/ id=${userId} successfully made suggestion`)),
      catchError(this.handleError<any>('makeSuggestion'))
    )
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
