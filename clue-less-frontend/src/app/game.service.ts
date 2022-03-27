import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retry } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lobby } from './lobby';

import { environment } from '../environments/environment';
import { MessageService } from './message.service';

const env = environment;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getLobby(): Observable<Lobby> {
    const lobbyApiUrl = `${env.gameServerApiUrl}:${env.gameServerPort}` + `${env.lobbyApiUrl}`
    return this.http.get<Lobby>(lobbyApiUrl)
      .pipe(
        tap(_ => this.log('fetch lobby info')),
        retry(3),
        catchError(this.handleError<Lobby>('getLobby'))
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
