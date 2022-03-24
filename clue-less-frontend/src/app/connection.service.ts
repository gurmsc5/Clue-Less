import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  public joinSession() {
    this.log("Attempting to join game session");
  }

  private log(message: string) {
    this.messageService.add(`ConnectionService: ${message}`);
  }
}
