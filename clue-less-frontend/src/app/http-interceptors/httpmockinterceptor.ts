import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Lobby } from "../lobby";
import { MessageService } from "../message.service";
import { PLAYERS } from "../mock-players";

@Injectable()
export class HttpMockinterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  // Intercept any requests for Lobby information
  intercept(req: HttpRequest<Lobby>, next: HttpHandler): Observable<HttpEvent<Lobby>> {
    if (req.method == 'GET') {
      this.messageService.add(`Intercepted request to fetch Lobby data`);
      let lobby: Lobby = { players: PLAYERS };
      return of(new HttpResponse({ status: 200, body: lobby}));
    }

    return next.handle(req);
  }
}
