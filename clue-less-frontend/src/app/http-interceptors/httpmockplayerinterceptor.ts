import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "../message.service";
import { Player } from "../player";

import {environment} from "../../environments/environment";

@Injectable()
export class HttpMockPlayerInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  // Intercept any requests for Player info (selection)
  intercept(req: HttpRequest<Player>, next: HttpHandler): Observable<HttpEvent<Player>> {
    if (req.method == 'POST' && req.url.includes(environment.selectPlayerApiUrl)) {
      this.messageService.add(`Intercepted request to select Player`);
      const player: Player = req.body as Player;
      player.available = true;
      return of(new HttpResponse({ status: 200, body: player}));
    }

    return next.handle(req);
  }
}
