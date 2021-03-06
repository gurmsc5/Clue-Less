import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "../message.service";
import { Game } from "../game";

import {environment} from "../../environments/environment";
import {MOCKGAME} from "../mock-game";

@Injectable()
export class HttpMockGameSessionInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  // Intercept any requests for Creating or getting game session
  intercept(req: HttpRequest<Game>, next: HttpHandler): Observable<HttpEvent<Game>> {
    if (req.method == "GET" || req.method == "POST") {
      this.messageService.add(`Intercepted request to create game or get game status`);
      let game: Game = MOCKGAME;
      if (req.url.includes(environment.startGameApiUrl)) {
        game.inProgress = true;
      }
      return of(new HttpResponse({ status: 200, body: game}));
    }

    return next.handle(req);
  }
}
