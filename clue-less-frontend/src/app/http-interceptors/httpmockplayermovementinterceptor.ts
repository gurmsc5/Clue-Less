import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "../message.service";
import { Game } from "../game";

import {environment} from "../../environments/environment";
import {MOCKGAME} from "../mock-game";

@Injectable()
export class HttpMockPlayerMovementInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  // Intercept any requests for Creating or getting game session
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Record<string, string>>> {
    if (req.method == "PUT" && req.url.includes(environment.movePlayerApiUrl)) {
      this.messageService.add(`Intercepted request to move player`);

      let responseBody: Record<string, string> = {Move: "Left", Message: "success"}
      return of(new HttpResponse({ status: 200, body: responseBody}));
    }

    return next.handle(req);
  }
}
