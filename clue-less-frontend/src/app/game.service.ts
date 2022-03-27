import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retry } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lobby } from './lobby';

import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { Player } from './player';

const env = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private selectPlayerApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.selectPlayerApiUrl}`;
  private lobbyApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}/${env.lobbyApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getLobby(): Observable<Lobby> {

    return this.http.get<Lobby>(this.lobbyApiUrl)
      .pipe(
        tap(_ => this.log('fetch lobby info')),
        retry(3),
        catchError(this.handleError<Lobby>('getLobby'))
      );
  }

  selectPlayer(player: Player): Observable<Player> {

    return this.http.post<Player>(this.selectPlayerApiUrl, player, this.httpOptions).pipe(
      tap((selectedPlayer: Player) => this.log(`Selected player w/ id=${selectedPlayer.id}`)),
      catchError(this.handleError<Player>('selectPlayer'))
    );
  }

  exitGame(): void {
    this.log("Exiting game");
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
