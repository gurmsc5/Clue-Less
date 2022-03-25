import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  public startSession() {
    this.log("Attempting to start game session");
  }

  private log(message: string) {
    this.messageService.add(`ConnectionService: ${message}`);
  }
}
