import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, retry} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Lobby} from './lobby';
import {playerinfo} from './playerinfo';
import {environment} from '../environments/environment';
import {MessageService} from './message.service';
import {Player} from './player';
import {Game} from './game';
import {FormGroup} from "@angular/forms";

const env = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {

  private baseApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}`;
  private webSocketEndPoint = `${this.baseApiUrl}/ws`;
  private selectPlayerApiUrl = `${this.baseApiUrl}/${env.selectPlayerApiUrl}`;
  private lobbyApiUrl = `${this.baseApiUrl}/${env.lobbyApiUrl}`;
  private createGameApiUrl = `${this.baseApiUrl}/${env.createGameApiUrl}`;
  private exitGameApiUrl = `${this.baseApiUrl}/${env.exitGameApiUrl}`;
  private startGameApiUrl = `${this.baseApiUrl}/${env.startGameApiUrl}`;
  private gameStatusApiUrl = `${this.baseApiUrl}/${env.gameStatusApiUrl}`;
  private playGameApiUrl = `${this.baseApiUrl}/${env.playGameApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
      })
  };

  stompClient: any;
  gameState: Game | undefined;
  serverIsConnected: boolean = false;

  private gameDataSubject: BehaviorSubject<Game> = new BehaviorSubject<Game>(undefined);

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnDestroy(): void {
    this.gameDataSubject.unsubscribe();
    this._disconnect();
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    var headers = {
      'Access-Control-Allow-Origin': true
    };
    _this.stompClient.connect(headers, function (frame) {
        _this.stompClient.subscribe("/game/status", function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
        });
        _this.stompClient.reconnect_delay = 2000;
        _this.serverIsConnected = true;
      }
      , function(e) {
        console.log("Game status WS error callback: " +e);
        setTimeout(() => {
          _this._connect();
        }, 5000);
      });
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  onMessageReceived(message) {
    console.log("Game status received from Server");
    this.gameDataSubject.next(message.body);
  }
  /**
   * Get game status information via websocket
   * @param gameId - unique game ID to get status info for
   */
  getGameStatus(gameId: number): void {
    this.stompClient.send("/clueless/get-status", {}, gameId);
  }

  getUpdatedGameStatus(): Observable<Game> {
    return this.gameDataSubject.asObservable();
  }

  private updateServerApiVars(gameServerIp: string, gameServerPort: string) {
    this.baseApiUrl = `http://${gameServerIp}:${gameServerPort}`;
    this.webSocketEndPoint = `${this.baseApiUrl}/ws`;
    this.selectPlayerApiUrl = `${this.baseApiUrl}/${env.selectPlayerApiUrl}`;
    this.lobbyApiUrl = `${this.baseApiUrl}/${env.lobbyApiUrl}`;
    this.createGameApiUrl = `${this.baseApiUrl}/${env.createGameApiUrl}`;
    this.exitGameApiUrl = `${this.baseApiUrl}/${env.exitGameApiUrl}`;
    this.startGameApiUrl = `${this.baseApiUrl}/${env.startGameApiUrl}`;
    this.gameStatusApiUrl = `${this.baseApiUrl}/${env.gameStatusApiUrl}`;
    this.playGameApiUrl = `${this.baseApiUrl}/${env.playGameApiUrl}`;
  }

  /**
   * Request to see the lobby of the game session (assuming game hasn't been started yet)
   * @param gameId - ID of the game session
   * @param gameServerIp - Game server IP
   * @param gameServerPort - Game server port
   */
  connectToServer(gameId: number, gameServerIp: string, gameServerPort): Observable<Lobby> {
    if (!this.serverIsConnected) {
      this.updateServerApiVars(gameServerIp, gameServerPort);
      this._connect();
    }

    return this.getLobby(gameId);
  }

  /**
   * Request to see the lobby of the game session (assuming game hasn't been started yet)
   * @param gameId - ID of the game session
   */
  getLobby(gameId: number): Observable<Lobby> {
    //this.log("Sending request to fetch lobby info");
    const lobbyApiUrl = `${this.lobbyApiUrl}/${gameId}`
    return this.http.get<Lobby>(lobbyApiUrl)
      .pipe(
        tap(lobby => {
          //this.log(`fetched lobby info: ${lobby.id}`);
          //lobby.players.forEach((player) => this.log(`player id=${player.id}, name=${player.name}, available=${player.available}`));
        }),
        catchError(this.handleError<Lobby>('getLobby'))
      );
  }

  /**
   * Get game status information
   * @param gameId - game to get status information for

  getGameStatus(gameId: number): void {
    this.log("Sending request to fetch game status info");
    const gameStatusUrl = `${this.gameStatusApiUrl}/${gameId}`;

    return this.http.get<Game>(gameStatusUrl).pipe(
      tap(game => {
        this.log(`fetched game status info: ${game.gameId}`);
      }),
      catchError(this.handleError<Game>('getGameStatus'))
    );
  }
   */



  /**
   * Request to select a player for a given game session
   * @param player - Player character selected by user
   * @param gameId - ID of the game session
   */
  selectPlayer(player: Player, gameId: number): Observable<Player> {
    const selectPlayerUrl = `${this.selectPlayerApiUrl}/${gameId}?userId=${player.id}&character=${player.name}`;
    //this.stompClient.send("/clueless/joingame", {}, JSON.stringify(pinfo));

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
    );

  }

  /**
   * Send request to backend for player's suggestion action
   *
   * @param gameId - unique game ID
   * @param userId - user making the suggestion
   * @param suspect - suspect of the suggestion
   * @param weapon - weapon used
   */
  makeSuggestion(gameId: number, userId: number, suspect: string, weapon: string) {
    const suggestionUrl = `${this.playGameApiUrl}/${gameId}/suggestion?userId=${userId}&suspect=${suspect}&weapon=${weapon}`;

    return this.http.post<any>(suggestionUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player w/id =${userId} attempted suggestion action`)),
      catchError(this.handleError<any>('makeSuggestion'))
    );
  }

  /**
   * Send request to backend for player's accusation action
   *
   * @param gameId - unique game ID
   * @param userId - user making the suggestion
   * @param suspect - suspect of the suggestion
   * @param weapon - weapon used
   * @param room - room where murder took place
   */
  makeAccusation(gameId: number,
                 userId: number,
                 suspect: string,
                 weapon: string,
                 room: string) {

    const accusationUrl =`${this.playGameApiUrl}/${gameId}/accusation?userId=${userId}&suspect=${suspect}&weapon=${weapon}&room=${room}`;

    return this.http.post<any>(accusationUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player w/id=${userId} made an accusation`)),
      catchError(this.handleError<any>('makeAccusation'))
    );

  }

  /**
   * End a player's turn
   * @param gameId - unique game ID
   * @param userId - user's player ID
   */
  endTurn(gameId: number, userId: number) {
    const endTurnUrl = `${this.playGameApiUrl}/${gameId}/${env.endTurnGameApiUrl}?userId=${userId}`;
    return this.http.post<any>(endTurnUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player w/id=${userId} attempted to end turn`)),
      catchError(this.handleError<any>('endTurn'))
    );

  }

  /**
   *
   * @param gameId
   * @param userId
   */
  disapproveSuggestion(gameId: number, userId: number) {
    const disapproveUrl = `${this.playGameApiUrl}/${gameId}/${env.disapproveApiUrl}?userId=${userId}`;
    return this.http.post<any>(disapproveUrl, this.httpOptions).pipe(
      tap(() => this.log(`Player w/id=${userId} attempted to disapprove suggestion`)),
      catchError(this.handleError<any>('disapproveSuggestion'))
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

