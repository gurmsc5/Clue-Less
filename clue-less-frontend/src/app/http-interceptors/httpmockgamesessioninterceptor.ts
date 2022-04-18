import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "../message.service";
import { Game } from "../game";

import {environment} from "../../environments/environment";

@Injectable()
export class HttpMockGameSessionInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  // Intercept any requests for Player info (selection)
  intercept(req: HttpRequest<Game>, next: HttpHandler): Observable<HttpEvent<Game>> {
    if (req.method == 'POST' && req.url.includes(environment.createGameApiUrl)) {
      this.messageService.add(`Intercepted request to create game`);
      let game: Game = {gameId: 1, gameName: "test-game"};
      return of(new HttpResponse({ status: 200, body: game}));
    }

    return next.handle(req);
  }
}
